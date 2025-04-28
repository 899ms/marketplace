import React from 'react';
import Link from 'next/link';
import * as LinkButton from '@/components/ui/link-button';
import { RiArrowRightSLine } from '@remixicon/react';

// --- Section Header Component ---
interface SectionHeaderProps {
  title: string;
  href?: string;
}
const SectionHeader = ({ title, href = '#' }: SectionHeaderProps) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-[24px] text-[#0E121B] font-semibold '>{title}</h2>
      <LinkButton.Root
        variant='gray'
        size='small'
        className='text-surface-800 text-[14px] font-medium'
        asChild
      >
        <Link href={href} className='leading-none'>
          More
          <LinkButton.Icon as={RiArrowRightSLine} className='size-6'/>
        </Link>
      </LinkButton.Root>
    </div>
  );
};

export default SectionHeader;
