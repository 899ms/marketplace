import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceOperations } from '@/utils/supabase/database';
import { Service } from '@/utils/supabase/types';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Button from '@/components/ui/button';
import * as Breadcrumb from '@/components/ui/breadcrumb';
import { ImageCarousel } from '../../../components/services/detail/image-carousel';
import { RelatedServiceCard } from '../../../components/services/detail/related-service-card';
import { ReviewItem } from '../../../components/services/detail/review-item';
import {
  RelatedService,
  ReviewUser,
  Review,
} from '../../../components/services/detail/types';
import {
  RiStarFill,
  RiGoogleFill,
  RiArrowRightSLine,
  RiHeartLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiCalendar2Line,
  RiMessage2Line,
  RiCheckLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiHomeLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';
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
    <div className='container mx-auto px-4 py-10'>
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
            <Link href='/services/search'>Services</Link>
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={RiArrowRightSLine} />

          <Breadcrumb.Item active>{service.title}</Breadcrumb.Item>
        </Breadcrumb.Root>
      </div>

      <h1 className='text-2xl mb-6 font-semibold text-text-strong-950'>
        {service.title}
      </h1>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        <div className='md:col-span-8'>
          <ServiceInfoLeft
            service={service}
            portfolioServices={portfolioServices}
          />
        </div>

        <div className='md:col-span-4'>
          <ServiceInfoRight service={service} />
        </div>
      </div>
    </div>
  );
}
