'use client';

import React from 'react';
import {
  RiMoneyCnyCircleLine,
  RiTimeLine,
  RiCalendarLine,
  RiGroupLine,
} from '@remixicon/react';

interface ProjectInfoCardProps {
  budget: string;
  releaseTime: string;
  deadline: string;
  proposals: number;
}

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  budget,
  releaseTime,
  deadline,
  proposals,
}) => {
  return (
    <div>
      {/* Budget */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <RiMoneyCnyCircleLine className="text-icon-secondary-400 size-5" />
          <span className="text-sm font-medium text-gray-600">
            Budget
          </span>
        </div>
        <span className="text-[24px] text-text-strong-950">
          {budget}
        </span>
      </div>

      {/* Release time */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <RiTimeLine className="text-icon-secondary-400 size-5" />
          <span className="text-sm font-medium text-gray-600">
            Release time
          </span>
        </div>
        <span className="text-xs text-text-secondary-600">
          {releaseTime}
        </span>
      </div>

      {/* Deadline */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <RiCalendarLine className="text-icon-secondary-400 size-5" />
          <span className="text-sm font-medium text-gray-600">
            Deadline
          </span>
        </div>
        <span className="text-xs text-text-secondary-600">
          {deadline}
        </span>
      </div>

      {/* Proposals */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <RiGroupLine className="text-icon-secondary-400 size-5" />
          <span className="text-sm font-medium text-gray-600">
            Proposals
          </span>
        </div>
        <span className="text-xs text-text-secondary-600">
          {proposals}
        </span>
      </div>
    </div>
  );
};

export default ProjectInfoCard;
