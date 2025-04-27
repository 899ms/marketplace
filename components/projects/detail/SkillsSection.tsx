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
      <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
        Skills
      </h2>
      <div className='flex flex-wrap gap-2'>
        {skills.map((skill, idx) => (
          <Badge.Root key={idx} variant='light' size='small'>
            {skill}
          </Badge.Root>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
