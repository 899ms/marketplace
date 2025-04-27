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
      <h2 className='text-xl font-semibold text-text-strong-950'>{title}</h2>
      <LinkButton.Root
        variant='gray'
        size='small'
        className='text-label-md'
        asChild
      >
        <Link href={href}>
          More
          <LinkButton.Icon as={RiArrowRightSLine} />
        </Link>
      </LinkButton.Root>
    </div>
  );
};

export default SectionHeader;
