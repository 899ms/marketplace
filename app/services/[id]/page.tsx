import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceOperations } from '@/utils/supabase/database';
import { Service } from '@/utils/supabase/types';
import * as Breadcrumb from '@/components/ui/breadcrumb';
import {
  RiArrowRightSLine,
  RiHomeLine,
} from '@remixicon/react';
import { ServiceInfoLeft } from '../../../components/services/detail/service-info-left';
import { ServiceInfoRight } from '../../../components/services/detail/service-info-right';

interface ServicePageProps {
  params: { id: string };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const serviceId = params.id;

  const service: Service | null = await serviceOperations.getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  let portfolioServices: Service[] = [];
  if (service.seller_id) {
    const allSellerServices = await serviceOperations.getServicesBySellerId(service.seller_id);
    portfolioServices = allSellerServices.filter(s => s.id !== serviceId);
  }

  return (
    <div className='container mx-auto  py-7 max-w-[1200px]'>
      <div className='mb-4'>
        <Breadcrumb.Root>
          <Breadcrumb.Item asChild>
            <Link href='/home'>
              <Breadcrumb.Icon as={RiHomeLine} />
              Home
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={RiArrowRightSLine} />

          <Breadcrumb.Item asChild>
            <Link href='/services/search?tab=Service'>Services</Link>
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={RiArrowRightSLine} />

          <Breadcrumb.Item active>{service.title}</Breadcrumb.Item>
        </Breadcrumb.Root>
      </div>

      <h1 className='text-[32px] mb-4 text-text-strong-950'>
        You will get wordpress website design
      </h1>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        <div className='md:col-span-8 max-w-[824px]'>
          <ServiceInfoLeft
            service={service}
            portfolioServices={portfolioServices}
          />
        </div>

        <div className='md:col-span-4 max-w-[324px]'>
          <ServiceInfoRight service={service} />
        </div>
      </div>
    </div>
  );
}
