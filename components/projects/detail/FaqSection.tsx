'use client'; // Needs to be a client component due to state

import React, { useState } from 'react';
import { RiAddLine, RiCloseLine } from '@remixicon/react';

// Define FAQ item type
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface FaqSectionProps {
  initialFaqs: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ initialFaqs }) => {
  const [faqs, setFaqs] = useState(initialFaqs);

  const toggleFaq = (index: number) => {
    // Create a new array with updated isOpen state for the clicked item
    setFaqs((currentFaqs) =>
      currentFaqs.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return faq; // Keep other items unchanged
      }),
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className='p-6'>
      <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
        Frequently Asked Questions
      </h2>

      <div className='space-y-4'>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className='overflow-hidden rounded-lg border border-stroke-soft-200'
          >
            <button
              onClick={() => toggleFaq(idx)}
              className='flex w-full items-center justify-between p-4 text-left font-medium text-text-strong-950'
            >
              <div className='flex items-center gap-3'>
                <div className='bg-bg-subtle-100 text-text-secondary-600 text-xs flex size-6 shrink-0 items-center justify-center rounded-full'>
                  {idx + 1}
                </div>
                {faq.question}
              </div>
              <div className='text-text-secondary-600'>
                {faq.isOpen ? (
                  <RiCloseLine className='size-5' />
                ) : (
                  <RiAddLine className='size-5' />
                )}
              </div>
            </button>

            {faq.isOpen && faq.answer && (
              <div className='text-sm text-text-secondary-600 border-t border-stroke-soft-200 p-4'>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
