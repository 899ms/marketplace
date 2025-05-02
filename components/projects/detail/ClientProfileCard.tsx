'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill, RiGoogleFill } from '@remixicon/react';

interface ClientProfileCardProps {
  client: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    isVerified: boolean;
  };
}

const ClientProfileCard: React.FC<ClientProfileCardProps> = ({ client }) => {
  return (
    <div className="m-[20px]">
      <div className="m-[32px] flex flex-col items-center text-center">
        <Avatar.Root size="72">
          <Avatar.Image src={client.avatar} alt={client.name} />
          <Avatar.Indicator position="bottom">
            <div className="size-4 rounded-full bg-green-500 ring-2 ring-white" />
          </Avatar.Indicator>
        </Avatar.Root>

        <h2 className="text-[16px] mt-3 font-semibold text-gray-600">
          {client.name}
        </h2>

        {/* Rating & reviews in gray-600 */}
        <div className="text-[12px] text-gray-600 mt-1 flex items-center gap-1">
          <RiStarFill className="size-4 text-yellow-400" />
          <span>
            {client.rating}({client.reviews})
          </span>
        </div>

        {/* Google icons with label */}
        <div className="text-[12px] mt-2 flex items-center gap-2 text-gray-600">
          <RiGoogleFill className="size-4" />
          <span>Google</span>
          <RiGoogleFill className="size-4" />
          <span>Google</span>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCard;
