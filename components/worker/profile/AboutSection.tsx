// components/worker/profile/AboutSection.tsx
import React from 'react'
import { RiPencilLine } from '@remixicon/react'

interface AboutSectionProps {
  about: string
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        {/* About text, max 80% */}
        <p className="text-gray-600 line-clamp-5 text-paragraph-sm max-w-[80%]">
          {about}
        </p>
        {/* Edit icon, right-aligned */}
        <button className="flex-shrink-0 text-icon-secondary-400 hover:text-icon-primary-500 ml-4">
          <RiPencilLine className="size-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
