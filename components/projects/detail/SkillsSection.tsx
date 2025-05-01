'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className='border-b border-stroke-soft-200 p-6'>
      <h2
        className='
          text-base
          font-semibold
          leading-6
          tracking-[-0.015em]
          text-[#161922]
          mb-4
        '
      >
        Skills
      </h2>
      <div className='flex flex-wrap gap-2'>
        {skills.map((skill, idx) => (
          <Badge.Root
            key={idx}
            variant='stroke'
            size='small'
            className=" 
              bg-bg-white-0
              border border-stroke-soft-200
              rounded-[6px]
              px-2 py-3
              gap-[3px]
              flex items-center justify-center
              font-medium text-[12px] leading-[16px] tracking-normal
              text/sub-500
            "
          >
            {skill}
          </Badge.Root>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
