'use client';

import React from 'react';
import ApplicantCard, { Applicant } from './ApplicantCard';

interface ApplicantsListProps {
  applicants: Applicant[];
  userRole: 'buyer' | 'seller';
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants, userRole }) => (
  <div className="shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0">
    {/* Header */}
    <div className="p-4">
      <h3 className="p-4 text-label-lg font-medium text-text-strong-950">
        List
      </h3>
      {/* 95% width separator */}
      <div className="w-[95%]mx-auto my-2 h-px bg-stroke-soft-200" />
    </div>

    {/* Cards */}
    <div>
      {applicants.map((a) => (
        <ApplicantCard key={a.id} applicant={a} userRole={userRole} />
      ))}
    </div>
  </div>
);

export default ApplicantsList;
