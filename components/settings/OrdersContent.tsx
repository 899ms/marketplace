'use client';

import React from 'react';
import { useAuth } from '@/utils/supabase/AuthContext';
import {
  contractOperations,
  jobOperations,
  userOperations,
} from '@/utils/supabase/database';
import {
  RiHeartLine,
} from '@remixicon/react';

import SummarySection, {
  type SummaryData,
} from '@/components/settings/SummarySection';
import TabsFiltersBar from '@/components/settings/TabsFiltersBar';
import OrdersTable, {
  type BuyerEngagement,
  type SellerOrder,
} from '@/components/settings/OrdersTable';
import PaginationBar from '@/components/settings/PaginationBar';

/* ------------------------------------------------------------------ */
/** Main right‑hand pane for “Orders” view (both buyers & sellers).   */
export default function OrdersContent() {
  /* ------------------ auth ------------------ */
  const { user, userProfile, loading: authLoading, profileLoading } = useAuth();
  const userType = userProfile?.user_type;      // 'buyer' | 'seller'
  const isBuyer = userType === 'buyer';

  /* ------------------ state ------------------ */
  const [orders, setOrders] = React.useState<(BuyerEngagement | SellerOrder)[]>([]);
  const [dataLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [activeTab, setActiveTab] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [sortOption, setSortOption] = React.useState('default');

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  /* ------------------ fetch orders ------------------ */
  React.useEffect(() => {
    if (authLoading || profileLoading || !user || !userType) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        if (isBuyer) {
          /* --- buyer: jobs + linked contracts --- */
          const [jobs, contracts] = await Promise.all([
            jobOperations.getJobsByBuyerId(user.id),
            contractOperations.getUserContracts(user.id),
          ]);

          const contractMap = new Map<string, Awaited<ReturnType<typeof contractOperations.getUserContracts>>[number]>();
          contracts.forEach((c) => c.job_id && contractMap.set(c.job_id, c));

          const rows: BuyerEngagement[] = await Promise.all(
            jobs.map(async (job) => {
              const linked = contractMap.get(job.id);
              if (linked && linked.seller_id) {
                const seller = await userOperations.getUserById(linked.seller_id);
                return {
                  id: linked.id,
                  type: 'contract',
                  subject: job.title,
                  price: linked.amount,
                  deadline: job.deadline || 'N/A',
                  worker: seller
                    ? {
                      name: seller.full_name,
                      avatarUrl: seller.avatar_url || 'https://via.placeholder.com/40',
                    }
                    : null,
                  status: linked.status || 'pending',
                };
              }
              return {
                id: job.id,
                type: 'job',
                subject: job.title,
                price: job.budget,
                deadline: job.deadline || 'N/A',
                worker: null,
                status: job.status || 'open',
              };
            }),
          );

          setOrders(rows);
        } else {
          /* --- seller: contracts where user is seller --- */
          const contracts = await contractOperations.getUserContracts(user.id);
          const sellerRows: SellerOrder[] = [];

          for (const c of contracts.filter((c) => c.seller_id === user.id)) {
            if (!c.buyer_id) continue;
            const buyer = await userOperations.getUserById(c.buyer_id);
            sellerRows.push({
              id: c.id,
              from: buyer
                ? { name: buyer.full_name, avatarUrl: buyer.avatar_url || 'https://via.placeholder.com/40' }
                : null,
              subject: c.title || 'Contract',
              price: c.amount,
              deadline: 'N/A',
              rating: 4.5,     // TODO replace with real rating
              status: c.status || 'pending',
            });
          }

          setOrders(sellerRows);
        }
      } catch (err) {
        console.error('fetchOrders', err);
        setError('Failed to load orders.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authLoading, profileLoading, user, userType, isBuyer]);

  /* ------------------ summary data ------------------ */
  const summaryData: SummaryData = {
    milestone: {
      title: 'Milestone',
      description: 'For only $4.99 per month!',
      learnMoreLink: '#',
      icon: <RiHeartLine className="size-5 text-icon-brand-500" />,
    },
    totalAmount: {
      title: 'Total Amount',
      value: isBuyer ? '$500.00' : '$50,110.00',
      actions: isBuyer ? (
        <div className="flex gap-2 text-sm">
          <button className="hover:underline text-text-brand-900">Top up</button>
          <button className="hover:underline text-text-brand-900">Withdraw</button>
        </div>
      ) : undefined,
    },
    settled: {
      title: 'Settled',
      value: isBuyer ? '$5,100.00' : '$11,500.00',
    },
    inEscrow: {
      title: 'In Escrow',
      value: isBuyer ? '$110.00' : '$111.00',
    },
  };

  /* ------------------ filtering / pagination ------------------ */
  const filtered = React.useMemo(() => {
    /* rudimentary search filter; extend with tab/date/sort logic later */
    return orders.filter((o) =>
      o.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  /* ------------------ auth guard ------------------ */
  if (authLoading || profileLoading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        Loading user…
      </main>
    );
  }
  if (!user || !userProfile) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        Please log in to view your orders.
      </main>
    );
  }

  /* ------------------ render ------------------ */
  return (
    <main className="flex-1 bg-bg-alt-white-100 p-6">
      {/* summary cards */}
      <SummarySection data={summaryData} />

      {/* tabs / search / filters */}
      <TabsFiltersBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        sortOption={sortOption}
        setSortOption={setSortOption}
        isBuyer={isBuyer}
        onSellerFilter={() => {
          /* placeholder for seller filter click */
        }}
      />

      {/* orders table */}
      {dataLoading ? (
        <div className="p-4 text-center">Loading orders…</div>
      ) : error ? (
        <div className="p-4 text-center text-red-600">{error}</div>
      ) : (
        <OrdersTable rows={currentData} isBuyer={isBuyer} />
      )}

      {/* pagination */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />
    </main>
  );
}
