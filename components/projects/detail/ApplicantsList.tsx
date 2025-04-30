'use client';

import React from 'react';
import ApplicantCard, { Applicant } from './ApplicantCard'; // Import ApplicantCard and Applicant type

interface ApplicantsListProps {
  applicants: Applicant[];
  userRole: 'buyer' | 'seller'; // Add userRole prop
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants, userRole }) => { // Destructure userRole
  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='border-b border-stroke-soft-200 p-4'>
        <h3 className='text-label-lg font-medium text-text-strong-950'>{/* Adjusted styles */}
          {userRole === 'buyer' ? 'Applicants' : 'List'} {/* Title depends on role */}
        </h3>
      </div>

      <div className='divide-y divide-stroke-soft-200'>
        {applicants.map((applicant) => (
          <ApplicantCard key={applicant.id} applicant={applicant} userRole={userRole} /> // Pass userRole down
        ))}
      </div>
      {/* TODO: Add pagination or "Load More" if needed */}
    </div>
  );
};

export default ApplicantsList;
