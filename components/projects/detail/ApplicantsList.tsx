'use client';

import React from 'react';
import ApplicantCard, { Applicant } from './ApplicantCard';

interface ApplicantsListProps {
  applicants: Applicant[];
  userRole: 'buyer' | 'seller';
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants, userRole }) => {
  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='border-b border-stroke-soft-200 p-4'>
        <h3 className='text-label-lg font-medium text-text-strong-950'>
          {userRole === 'buyer' ? 'Applicants' : 'List'}
        </h3>
      </div>

      {/* no divide-y here anymore */}
      <div>
        {applicants.map(a => (
          <ApplicantCard key={a.id} applicant={a} userRole={userRole} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantsList;
