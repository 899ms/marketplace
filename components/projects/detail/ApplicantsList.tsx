'use client';

import React from 'react';
import ApplicantCard, { Applicant } from './ApplicantCard';

interface ApplicantsListProps {
  applicants: Applicant[];
  userRole: 'buyer' | 'seller';
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants, userRole }) => (
  <div className="shadow-[0_16px_32px_-12px_rgba(14,18,27,0.1)] rounded-xl">
    {/* Header */}
    <div className="p-[16px]">
      <h3 className="text-[16px] font-medium text-text-strong-950">
        List
      </h3>
      {/* 95% width separator */}
    </div>

    <div className="w-[90%] mx-auto mb-2 mb-[16px] h-px bg-stroke-soft-200" />

    {/* Cards */}
    <div>
      {applicants.map((a) => (
        <ApplicantCard key={a.id} applicant={a} userRole={userRole} />
      ))}
    </div>
  </div>
);

export default ApplicantsList;
