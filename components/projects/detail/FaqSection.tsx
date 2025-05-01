'use client';

import React, { useState } from 'react';
import { RiAddLine, RiSubtractLine, RiQuestionMark } from '@remixicon/react';

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
    setFaqs(current =>
      current.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  if (!faqs.length) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-base font-semibold leading-6 tracking-[-0.015em] text-[#161922] mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`
              overflow-hidden
              rounded-lg
              border border-stroke-soft-200
              ${faq.isOpen ? 'bg-bg-weak-50' : ''}
            `}
          >
            {/* Question row */}
            <button
              onClick={() => toggleFaq(idx)}
              className="flex w-full items-center justify-between p-4 text-left font-medium text-text-strong-950"
            >
              <div className="flex items-center gap-3">
                {/* Black-bordered question mark */}
                <div className="border border-black rounded-full p-1 flex items-center justify-center">
                  <RiQuestionMark className="size-3 text-text-secondary-600" />
                </div>
                {faq.question}
              </div>

              {/* Plus/minus icon */}
              {faq.isOpen ? (
                <RiSubtractLine className="size-5 text-text-secondary-600" />
              ) : (
                <RiAddLine className="size-5 text-text-secondary-600" />
              )}
            </button>

            {/* Answer, flush under question text */}
            {faq.isOpen && faq.answer && (
              <div className="text-sm text-[#525866] pb-4 pl-[56px]">
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
