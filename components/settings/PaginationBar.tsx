'use client';

import React from 'react';
import * as Pagination from '@/components/ui/pagination';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

/* ------------------------------------------------------------------ */
interface Props {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

/* ------------------------------------------------------------------ */
/** Simple previous / current / next control used in Orders view. */
export default function PaginationBar({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: Props) {
  /* Hide the bar when there’s only one page */
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center border-t border-stroke-soft-200 pt-4">
      <Pagination.Root variant="basic">
        <Pagination.NavButton
          onClick={onPrev}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <Pagination.NavIcon as={RiArrowLeftSLine} />
        </Pagination.NavButton>

        <Pagination.Item current aria-label={`Page ${currentPage}`}>
          {currentPage}
        </Pagination.Item>

        <Pagination.NavButton
          onClick={onNext}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <Pagination.NavIcon as={RiArrowRightSLine} />
        </Pagination.NavButton>
      </Pagination.Root>
    </div>
  );
}
