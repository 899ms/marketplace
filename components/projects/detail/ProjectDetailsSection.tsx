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
    <div className='p-4'>
      <h2
        className="
          text-base
          font-semibold
          leading-6
          tracking-[-0.015em]
          text-[#161922]
          mb-4
        "
      >
        Project Details
      </h2>

      {description.map((paragraph, idx) => (
        <p
          key={idx}
          className="
            text-sm
            font-medium
            leading-5
            tracking-[-0.006em]
            text-[#525866]
            mb-4
          "
        >
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

      {/* underline */}
      <div className="w-[99%] h-[2px] bg-stroke-soft-200 mx-auto mt-8" />
    </div>
  );
};

export default ProjectDetailsSection;
