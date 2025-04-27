'use client';

import React from 'react';
import { RiCloseLine } from '@remixicon/react';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ label, onRemove }) => {
  return (
    <div className='text-xs text-text-secondary-600 flex items-center gap-1 rounded-md bg-bg-weak-50 px-2 py-1'>
      <span className='truncate'>{label}</span>
      <button
        onClick={onRemove}
        className='text-text-secondary-400 hover:text-text-secondary-600 flex-shrink-0'
        aria-label={`Remove ${label} filter`}
      >
        <RiCloseLine className='size-3.5' />
      </button>
    </div>
  );
};

export default FilterTag;
