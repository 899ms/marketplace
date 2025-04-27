'use client';

import React from 'react';

interface ProjectDetailsSectionProps {
  description: string[];
  requirements: string[];
}

const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({
  description,
  requirements,
}) => {
  return (
    <div className='border-b border-stroke-soft-200 p-6'>
      <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
        Project Details
      </h2>

      {description.map((paragraph, idx) => (
        <p key={idx} className='text-sm text-text-secondary-600 mb-4'>
          {paragraph}
        </p>
      ))}

      {requirements.length > 0 && (
        <>
          <h3 className='text-md mb-2 mt-6 font-medium text-text-strong-950'>
            Requirements
          </h3>
          <ul className='space-y-2 pl-5'>
            {requirements.map((requirement, idx) => (
              <li
                key={idx}
                className='text-sm text-text-secondary-600 list-disc'
              >
                {requirement}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsSection;
