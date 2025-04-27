'use client';

import React from 'react';
import ApplicantCard, { Applicant } from './ApplicantCard'; // Import ApplicantCard and Applicant type

interface ApplicantsListProps {
  applicants: Applicant[];
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants }) => {
  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='border-b border-stroke-soft-200 p-4'>
        <h3 className='font-semibold text-text-strong-950'>Applicants</h3>{' '}
        {/* Updated Title */}
      </div>

      <div className='divide-y divide-stroke-soft-200'>
        {applicants.map((applicant) => (
          <ApplicantCard key={applicant.id} applicant={applicant} />
        ))}
      </div>
      {/* TODO: Add pagination or "Load More" if needed */}
    </div>
  );
};

export default ApplicantsList;
