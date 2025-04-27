'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import {
  RiHomeLine,
  RiNotification4Line,
  RiStarFill,
  RiGoogleFill,
  RiTimeLine,
  RiCalendarLine,
  RiFileListLine,
  RiDownloadLine,
  RiPlayLine,
  RiCloseLine,
  RiAddLine,
  RiChat3Line,
} from '@remixicon/react';

// Mock data for the project
const projectData = {
  id: '1',
  title: 'Write professional resume, cover letter',
  category: 'Business',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus augue sagittis erat consectetur est. Blandit blandit nec mauris pulvinar. Lectus duis amet tortor, sit tincidunt. Rhoncus tincidunt imperdiet penatibus vitae risus, vitae. Blandit auctor justo nisi massa.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.',
  ],
  requirements: [
    'Neque sodales ut etiam sit amet nisi purus. Non tellus orci ac auctor.',
    'Adipiscing elit ut aliquam purus sit amet. Viverra suspendisse potenti nullam ac.',
    'Mauris commodo quis imperdiet massa tincidunt nunc pulvinar',
  ],
  skills: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop', 'Western Music'],
  attachments: [{ name: 'Audio_Script.mp3', type: 'audio', size: '2.4 MB' }],
  faqs: [
    {
      question: 'How to join the project?',
      answer: '',
      isOpen: false,
    },
    {
      question: 'What requirements must be met to participate in the project?',
      answer:
        'Insert the accordion description here. It would look better as two lines of text.',
      isOpen: true,
    },
    {
      question:
        'How long does it take to receive payment after project completion?',
      answer: '',
      isOpen: false,
    },
    {
      question: 'What requirements must be met to participate in the project?',
      answer: '',
      isOpen: false,
    },
  ],
  client: {
    name: 'Cleve Music',
    avatar: 'https://via.placeholder.com/100',
    rating: 4.9,
    reviews: 125,
    isVerified: true,
  },
  budget: '$140',
  releaseTime: '3h ago',
  deadline: '28 Feb 2025',
  proposals: 5,
  applicants: [
    {
      id: '1',
      name: 'James Brown',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
      hired: true,
      replacedBy: 'Arthur T.',
    },
    {
      id: '2',
      name: 'James Brown',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '3',
      name: 'Sophia Williams',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '4',
      name: 'Arthur Taylor',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '5',
      name: 'Emma Wright',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '6',
      name: 'Emma Wright',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
  ],
};

const ProjectDetailPage = () => {
  const [faqs, setFaqs] = useState(projectData.faqs);

  const toggleFaq = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].isOpen = !updatedFaqs[index].isOpen;
    setFaqs(updatedFaqs);
  };

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header with Navigation */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-sm flex items-center gap-2'>
          <Link
            href='/projects'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiHomeLine className='size-4' />
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <Link
            href='/projects'
            className='text-text-secondary-600 hover:text-text-strong-950'
          >
            Find Project
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <span className='font-medium text-text-strong-950'>
            Project Detail
          </span>
        </div>

        <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
          <RiNotification4Line className='size-5' />
        </button>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content Area */}
        <div className='md:col-span-8'>
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            {/* Project Title */}
            <div className='border-b border-stroke-soft-200 p-6'>
              <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-text-strong-950'>
                  {projectData.title}
                </h1>
                <Badge.Root
                  variant='stroke'
                  size='small'
                  className='text-text-secondary-600'
                >
                  {projectData.category}
                </Badge.Root>
              </div>
            </div>

            {/* Project Details */}
            <div className='border-b border-stroke-soft-200 p-6'>
              <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
                Project Details
              </h2>

              {projectData.description.map((paragraph, idx) => (
                <p key={idx} className='text-sm text-text-secondary-600 mb-4'>
                  {paragraph}
                </p>
              ))}

              <ul className='mt-4 space-y-2 pl-5'>
                {projectData.requirements.map((requirement, idx) => (
                  <li
                    key={idx}
                    className='text-sm text-text-secondary-600 list-disc'
                  >
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Section */}
            <div className='border-b border-stroke-soft-200 p-6'>
              <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
                Skills
              </h2>
              <div className='flex flex-wrap gap-2'>
                {projectData.skills.map((skill, idx) => (
                  <Badge.Root key={idx} variant='light' size='small'>
                    {skill}
                  </Badge.Root>
                ))}
              </div>
            </div>

            {/* Attachments Section */}
            <div className='border-b border-stroke-soft-200 p-6'>
              <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
                Attachments
              </h2>

              <div className='rounded-lg border border-stroke-soft-200 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-bg-subtle-100 flex size-10 items-center justify-center rounded-full'>
                      <RiPlayLine className='size-5 text-text-strong-950' />
                    </div>
                    <span className='font-medium text-text-strong-950'>
                      {projectData.attachments[0].name}
                    </span>
                  </div>
                  <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
                    <RiDownloadLine className='size-5' />
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
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
                        <div className='bg-bg-subtle-100 text-text-secondary-600 flex size-6 shrink-0 items-center justify-center rounded-full'>
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

                    {faq.isOpen && (
                      <div className='text-sm text-text-secondary-600 border-t border-stroke-soft-200 p-4'>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='md:col-span-4'>
          {/* Combined Client and Budget Card */}
          <div className='shadow-sm mb-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            {/* Client Profile Section */}
            <div className='border-b border-stroke-soft-200 p-6'>
              <div className='flex flex-col items-center text-center'>
                <Avatar.Root size='80'>
                  <Avatar.Image
                    src={projectData.client.avatar}
                    alt={projectData.client.name}
                  />
                  <Avatar.Indicator position='bottom'>
                    <div className='size-4 rounded-full bg-green-500 ring-2 ring-white' />
                  </Avatar.Indicator>
                </Avatar.Root>

                <h2 className='text-xl mt-3 font-semibold text-text-strong-950'>
                  {projectData.client.name}
                </h2>

                <div className='text-text-secondary-600 mt-1 flex items-center gap-1'>
                  <RiStarFill className='size-4 text-yellow-400' />
                  <span>
                    {projectData.client.rating} ({projectData.client.reviews})
                  </span>
                </div>

                <div className='mt-2 flex items-center'>
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                </div>
              </div>
            </div>

            {/* Budget Section */}
            <div className='flex justify-between p-4'>
              <span className='text-text-secondary-600 font-medium'>
                Budget
              </span>
              <span className='font-semibold text-text-strong-950'>
                {projectData.budget}
              </span>
            </div>

            {/* Release Time Section */}
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <RiTimeLine className='text-icon-secondary-400 size-5' />
                <div>
                  <span className='text-sm block font-medium text-text-strong-950'>
                    Release time
                  </span>
                  <span className='text-xs text-text-secondary-600'>
                    {projectData.releaseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Deadline Section */}
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <RiCalendarLine className='text-icon-secondary-400 size-5' />
                <div>
                  <span className='text-sm block font-medium text-text-strong-950'>
                    Deadline
                  </span>
                  <span className='text-xs text-text-secondary-600'>
                    {projectData.deadline}
                  </span>
                </div>
              </div>
            </div>

            {/* Proposals Section */}
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <RiFileListLine className='text-icon-secondary-400 size-5' />
                <div>
                  <span className='text-sm block font-medium text-text-strong-950'>
                    Proposals
                  </span>
                  <span className='text-xs text-text-secondary-600'>
                    {projectData.proposals}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Applicants List */}
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <div className='border-b border-stroke-soft-200 p-4'>
              <h3 className='font-semibold text-text-strong-950'>List</h3>
            </div>

            <div className='divide-y divide-stroke-soft-200'>
              {projectData.applicants.map((applicant) => (
                <div key={applicant.id} className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Avatar.Root size='40'>
                        <Avatar.Image
                          src={applicant.avatar}
                          alt={applicant.name}
                        />
                      </Avatar.Root>

                      <div>
                        <p className='font-medium text-text-strong-950'>
                          {applicant.name}
                        </p>
                        {applicant.hired && (
                          <p className='text-xs text-text-secondary-600'>
                            Replaced by {applicant.replacedBy}
                          </p>
                        )}
                        {!applicant.hired && (
                          <div className='text-xs text-text-secondary-600 flex items-center gap-1'>
                            <RiStarFill className='size-3 text-yellow-400' />
                            <span>
                              {applicant.rating} ({applicant.reviews})
                            </span>
                            <span className='mx-1'>•</span>
                            <span>{applicant.time}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {applicant.hired ? (
                      <span className='text-xs rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-600'>
                        Hired
                      </span>
                    ) : (
                      <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
                        <RiChat3Line className='size-5' />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
