'use client';

import React, { useState } from 'react';
import * as Accordion from '@/components/ui/accordion';
import * as Button from '@/components/ui/button';
import * as Checkbox from '@/components/ui/checkbox';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import * as Switch from '@/components/ui/switch';
import * as Tag from '@/components/ui/tag';
import * as Textarea from '@/components/ui/textarea';
import * as FileUpload from '@/components/ui/file-upload';
import {
  RiArrowRightSLine,
  RiCustomerService2Line,
  RiArrowDownSLine,
  RiInformationLine,
  RiCalendarLine,
  RiDeleteBinLine,
  RiFileTextLine,
  RiCheckboxCircleFill,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// --- Vertical Stepper Component ---
interface VerticalStepperProps {
  currentStep: number;
  steps: string[];
  onStepClick: (step: number) => void;
}

const VerticalStepper = ({
  currentStep,
  steps,
  onStepClick,
}: VerticalStepperProps) => {
  return (
    <aside className='shadow-sm sticky top-20 hidden h-[calc(100vh-10rem)] w-64 shrink-0 flex-col justify-between rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 lg:flex xl:w-72'>
      <div>
        <p className='text-xs text-text-secondary-600 mb-4 font-semibold uppercase'>
          TRANSFER SEQUENCE
        </p>
        <nav>
          <ul className='flex flex-col gap-1'>
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              return (
                <li key={label}>
                  <button
                    onClick={() => onStepClick(stepNumber)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-label-md transition-colors duration-200',
                      stepNumber === currentStep
                        ? 'bg-bg-weak-50 font-medium text-text-strong-950'
                        : 'text-text-secondary-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
                    )}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={cn(
                          'flex size-5 items-center justify-center rounded-full text-label-xs font-medium',
                          stepNumber === currentStep
                            ? 'bg-primary-base text-static-white'
                            : 'text-text-secondary-600 bg-bg-soft-200',
                        )}
                      >
                        {String(stepNumber).padStart(2, '0')}
                      </div>
                      {label}
                    </div>
                    {stepNumber === currentStep && (
                      <RiArrowRightSLine className='text-text-secondary-600 size-4' />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Contact Button */}
      <div className='mt-auto border-t border-stroke-soft-200 pt-4'>
        <p className='text-sm text-text-secondary-600 mb-2 text-center'>
          Having trouble with transfer?
        </p>
        <Button.Root variant='neutral' mode='stroke' className='w-full'>
          <Button.Icon as={RiCustomerService2Line} />
          Contact
        </Button.Root>
      </div>
    </aside>
  );
};

// --- Main Content Component ---
interface CreateJobMainContentProps {
  steps: { title: string; content?: React.ReactNode }[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const CreateJobMainContent = ({
  steps,
  activeStep,
  setActiveStep,
}: CreateJobMainContentProps) => {
  const activeValue = `item-${activeStep}`;
  const handleValueChange = (value: string) => {
    const stepNum = parseInt(value.split('-')[1]);
    setActiveStep(stepNum);
  };

  return (
    <main className='mx-auto px-4 py-6 md:px-10'>
      <h1 className='text-3xl mb-2 font-semibold text-text-strong-950'>
        Create job
      </h1>
      <p className='text-text-secondary-600 mb-8'>
        Define details, set the budget and outline preferences
      </p>

      <Accordion.Root
        type='single'
        collapsible
        className='w-full max-w-2xl space-y-3'
        value={activeValue} // Control expansion based on activeStep
        onValueChange={handleValueChange} // Update activeStep when accordion changes
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <Accordion.Item
              value={`item-${stepNumber}`}
              key={stepNumber}
              className='shadow-sm overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 data-[state=open]:border-stroke-strong-950'
            >
              <Accordion.Trigger className='flex w-full items-center justify-between p-4 text-left hover:bg-bg-weak-50'>
                <div className='flex items-center gap-3'>
                  <div className='text-text-secondary-600 flex size-6 items-center justify-center rounded-full bg-bg-soft-200 text-label-xs font-medium'>
                    {String(stepNumber).padStart(2, '0')}
                  </div>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    {step.title}
                  </span>
                </div>
                <RiArrowDownSLine className='text-text-secondary-600 size-5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180' />
              </Accordion.Trigger>
              <Accordion.Content className='border-t border-stroke-soft-200 p-6'>
                {/* Placeholder for step content */}
                {step.content || <p>Content for {step.title} goes here...</p>}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </main>
  );
};

// --- Step 1 Form Component ---
const Step1BasicInfoForm = ({ nextStep }: { nextStep: () => void }) => {
  // TODO: Connect formData and setFormData
  return (
    <div className='space-y-6'>
      {/* Subject */}
      <div className='flex flex-col gap-1'>
        <Label.Root className='text-label-sm text-text-strong-950'>
          Subject
        </Label.Root>
        <Input.Root>
          <Input.Wrapper>
            <Input.Input placeholder='Project subject' />
          </Input.Wrapper>
        </Input.Root>
      </div>

      {/* Detail */}
      <div className='flex flex-col gap-1'>
        <Label.Root className='text-label-sm text-text-strong-950'>
          Detail
        </Label.Root>
        <Textarea.Root rows={4} placeholder='Details' className='resize-none'>
          {/* TODO: Add actual character counting logic */}
        </Textarea.Root>
        <span className='text-xs text-text-secondary-600 self-end'>
          Max 1000
        </span>
      </div>

      {/* Amount & Deadline Row */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Amount */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
            Amount
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>
          <div className='flex gap-2'>
            <Input.Root className='flex-1'>
              <Input.Wrapper>
                <Input.InlineAffix>¥</Input.InlineAffix>
                <Input.Input
                  type='number'
                  placeholder='0.00'
                  defaultValue={0.0}
                />
              </Input.Wrapper>
            </Input.Root>
            <Select.Root defaultValue='CNY' size='small'>
              <Select.Trigger className='w-auto'>
                {/* Placeholder for Flag + Currency */}
                <div className='flex items-center gap-1.5'>
                  <span className='flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white'>
                    C
                  </span>
                  CNY
                </div>
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value='CNY'>CNY</Select.Item>
                  <Select.Item value='USD'>USD</Select.Item>
                  <Select.Item value='EUR'>EUR</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Deadline */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
            Deadline (Optional)
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon>
                <RiCalendarLine />
              </Input.Icon>
              <Input.Input placeholder='DD / MM / YYYY' />
              {/* Consider using type="date" if browser support is sufficient and styling allows */}
            </Input.Wrapper>
          </Input.Root>
        </div>
      </div>

      {/* Negotiate Budget */}
      <div className='flex items-center gap-2'>
        <Switch.Root id='negotiate-budget'></Switch.Root>
        <Label.Root
          htmlFor='negotiate-budget'
          className='text-sm text-text-secondary-600'
        >
          Negotiate the budget
        </Label.Root>
      </div>

      {/* Navigation */}
      <div className='flex justify-end'>
        <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
          Next
        </Button.Root>
      </div>
    </div>
  );
};

// --- Step 2 Skills Form Component ---
const Step2SkillsForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  // TODO: Connect formData and setFormData
  // State for multi-select tags
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Trainee',
    'Skilled',
    'Expert',
  ]);
  const [selectedSources, setSelectedSources] = useState<string[]>([
    'Manual Entry',
  ]);

  // State for uploaded files (example)
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      name: 'my-cv.pdf',
      size: '120 KB',
      status: 'Completed',
    },
  ]);

  // Handler to remove skill tag
  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove),
    );
  };

  // Handler to remove source tag
  const handleRemoveSource = (sourceToRemove: string) => {
    setSelectedSources(
      selectedSources.filter((source) => source !== sourceToRemove),
    );
  };

  // Handler to remove file (example)
  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
  };

  // TODO: Implement actual file upload logic

  return (
    <div className='space-y-6'>
      {/* Skill Levels */}
      <div className='flex flex-col gap-1'>
        <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
          Skill Levels
          <RiInformationLine className='text-icon-secondary-400 size-4' />
        </Label.Root>
        <Select.Root
          onValueChange={(value) => {
            // Add skill to list if not already present
            if (value && !selectedSkills.includes(value)) {
              setSelectedSkills([...selectedSkills, value]);
            }
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder='Select skill level' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value='Trainee'>Trainee</Select.Item>
              <Select.Item value='Director'>Director</Select.Item>
              <Select.Item value='Skilled'>Skilled</Select.Item>
              <Select.Item value='Expert'>Expert</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {selectedSkills.length > 0 && (
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {selectedSkills.map((skill, index) => (
              <Tag.Root key={index} variant='stroke' className='pl-2'>
                {skill}
                <Tag.DismissButton onClick={() => handleRemoveSkill(skill)} />
              </Tag.Root>
            ))}
          </div>
        )}
      </div>

      {/* Candidate Sources */}
      <div className='flex flex-col gap-1'>
        <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
          Candidate Sources
          <RiInformationLine className='text-icon-secondary-400 size-4' />
        </Label.Root>
        <Select.Root
          onValueChange={(value) => {
            // Add source to list if not already present
            if (value && !selectedSources.includes(value)) {
              setSelectedSources([...selectedSources, value]);
            }
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder='Select candidate source' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value='Manual Entry'>Manual Entry</Select.Item>
              <Select.Item value='Referral'>Referral</Select.Item>
              <Select.Item value='Skilled'>Skilled</Select.Item>{' '}
              {/* Assuming 'Skilled' is a source type */}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {selectedSources.length > 0 && (
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {selectedSources.map((source, index) => (
              <Tag.Root key={index} variant='stroke' className='pl-2'>
                {source}
                <Tag.DismissButton onClick={() => handleRemoveSource(source)} />
              </Tag.Root>
            ))}
          </div>
        )}
      </div>

      {/* Add Download File */}
      <div className='space-y-4'>
        <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
          Add Download File (Up to 3 audio files)
        </Label.Root>
        <FileUpload.Root className='flex-col items-start p-4 sm:flex-row sm:items-center sm:justify-between'>
          <input type='file' multiple className='hidden' />
          <div className='space-y-1'>
            <div className='text-label-sm text-text-sub-600'>
              MP3 format and 25 mb size limitations
            </div>
          </div>
          <FileUpload.Button className='mt-3 sm:mt-0'>Upload</FileUpload.Button>
        </FileUpload.Root>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className='space-y-3'>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg border border-stroke-soft-200 bg-bg-weak-50 p-3'
              >
                <div className='flex items-center gap-3'>
                  <RiFileTextLine className='text-icon-secondary-400 size-5 shrink-0' />
                  <div>
                    <p className='text-sm font-medium text-text-strong-950'>
                      {file.name}
                    </p>
                    <div className='flex items-center gap-1.5'>
                      <span className='text-xs text-text-secondary-600'>
                        {file.size}
                      </span>
                      {file.status === 'Completed' && (
                        <div className='text-xs flex items-center gap-0.5 text-success-base'>
                          <RiCheckboxCircleFill className='size-3' />
                          Completed
                        </div>
                      )}
                      {/* Add other statuses like 'Uploading', 'Error' */}
                    </div>
                  </div>
                </div>
                <Button.Root
                  variant='neutral'
                  mode='ghost'
                  size='small'
                  onClick={() => handleRemoveFile(file.name)}
                >
                  <Button.Icon as={RiDeleteBinLine} />
                </Button.Root>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button.Root variant='neutral' mode='stroke' onClick={prevStep}>
          Previous
        </Button.Root>
        <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
          Next
        </Button.Root>
      </div>
    </div>
  );
};

// --- Step 3 Usage Form Component ---
const Step3UsageForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  // TODO: Connect formData and setFormData
  const [usageOption, setUsageOption] = useState<string>('private'); // 'private' or 'business'
  const [privacyOption, setPrivacyOption] = useState<string>('public'); // 'public' or 'private'

  return (
    <div className='space-y-6'>
      {/* Usage Section */}
      <div className='space-y-3'>
        <h3 className='text-xs text-text-secondary-600 font-semibold uppercase'>
          Usage
        </h3>
        <div className='space-y-3'>
          {/* Private Usage Option */}
          <label
            className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
            data-checked={usageOption === 'private'}
            onClick={() => setUsageOption('private')}
          >
            <Checkbox.Root
              id='usage-private'
              value='private'
              checked={usageOption === 'private'}
              onCheckedChange={() => setUsageOption('private')}
            />
            <div className='grid gap-1'>
              <span className='text-label-md font-medium text-text-strong-950'>
                Private
              </span>
              <span className='text-text-secondary-600 text-paragraph-sm'>
                For purposes such as hobbies and interests.
              </span>
            </div>
          </label>
          {/* Business Usage Option */}
          <label
            className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
            data-checked={usageOption === 'business'}
            onClick={() => setUsageOption('business')}
          >
            <Checkbox.Root
              id='usage-business'
              value='business'
              checked={usageOption === 'business'}
              onCheckedChange={() => setUsageOption('business')}
            />
            <div className='grid gap-1'>
              <span className='text-label-md font-medium text-text-strong-950'>
                Business
              </span>
              <span className='text-text-secondary-600 text-paragraph-sm'>
                For purposes such as signing contracts and issuing.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Privacy Section */}
      <div className='space-y-3'>
        <h3 className='text-xs text-text-secondary-600 font-semibold uppercase'>
          Privacy
        </h3>
        <div className='space-y-3'>
          {/* Public Privacy Option */}
          <label
            className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
            data-checked={privacyOption === 'public'}
            onClick={() => setPrivacyOption('public')}
          >
            <Checkbox.Root
              id='privacy-public'
              value='public'
              checked={privacyOption === 'public'}
              onCheckedChange={() => setPrivacyOption('public')}
            />
            <div className='grid gap-1'>
              <span className='text-label-md font-medium text-text-strong-950'>
                Public
              </span>
              <span className='text-text-secondary-600 text-paragraph-sm'>
                Any worker can apply for the job.
              </span>
            </div>
          </label>
          {/* Private Privacy Option */}
          <label
            className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
            data-checked={privacyOption === 'private'}
            onClick={() => setPrivacyOption('private')}
          >
            <Checkbox.Root
              id='privacy-private'
              value='private'
              checked={privacyOption === 'private'}
              onCheckedChange={() => setPrivacyOption('private')}
            />
            <div className='grid gap-1'>
              <span className='text-label-md font-medium text-text-strong-950'>
                Private
              </span>
              <span className='text-text-secondary-600 text-paragraph-sm'>
                Only those who have been invited can take part in the work.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button.Root variant='neutral' mode='stroke' onClick={prevStep}>
          Previous
        </Button.Root>
        <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
          Next
        </Button.Root>
      </div>
    </div>
  );
};

// --- Step 4 Preview Component ---
const Step4Preview = ({
  formData,
  prevStep,
  submitForm,
}: {
  formData: FormData;
  prevStep: () => void;
  submitForm: () => void;
}) => {
  // Use mock data until formData is fully wired
  const mockData = {
    subject: 'Project Subject Example',
    detail: 'Description Text Here...',
    amount: 200,
    currency: 'USD', // Assuming based on $ sign
    deadline: '18 Feb, 2025', // Or Date object
    negotiate: false,
    skills: ['Entry Level', 'Internship', 'Mid-level Senior'],
    sources: ['Manual Entry'],
    files: [
      { name: 'file_example_1.pdf' },
      { name: 'file_example_2.docx' },
      { name: 'another_document.txt' },
    ],
    usage: 'private', // 'private' or 'business'
    privacy: 'public', // 'public' or 'private'
    discountCode: 'codeabcde',
    discountAmount: 20,
  };

  // Replace mockData with formData when available
  const displayData = { ...mockData, ...formData };

  const getUsageDescription = (option: string) => {
    if (option === 'private')
      return 'For purposes such as hobbies and interests.';
    if (option === 'business')
      return 'For purposes such as signing contracts and issuing.';
    return '';
  };

  const getPrivacyDescription = (option: string) => {
    if (option === 'public') return 'Any worker can apply for the job.';
    if (option === 'private')
      return 'Only those who have been invited can take part in the work.';
    return '';
  };

  const formatCurrency = (value: number) => {
    // Basic formatting, consider using Intl.NumberFormat for better localization
    return `$${value.toFixed(0)}`; // Assuming USD and integer display based on image
  };

  const finalAmount = displayData.amount - displayData.discountAmount;

  return (
    <div className='space-y-6'>
      {/* Step 1 Basic */}
      <div className='rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Step 1 Basic
        </p>
        <p className='text-sm font-medium text-text-strong-950'>
          {displayData.subject}
        </p>
        <p className='text-sm text-text-secondary-600 mt-1'>
          {displayData.detail}
        </p>
      </div>

      {/* Step 2 Skills */}
      <div className='space-y-3 rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Step 2 Skills
        </p>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-text-strong-950'>
            Experience Levels
          </span>
          <div className='flex flex-wrap justify-end gap-1.5'>
            {displayData.skills.map((skill: string, index: number) => (
              <Tag.Root key={index} variant='gray'>
                {skill}
              </Tag.Root>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-text-strong-950'>
            Candidate Sources
          </span>
          <div className='flex flex-wrap justify-end gap-1.5'>
            {displayData.sources.map((source: string, index: number) => (
              <Tag.Root key={index} variant='gray'>
                {source}
              </Tag.Root>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-text-strong-950'>Files</span>
          <div className='flex flex-col items-end gap-1'>
            {displayData.files.map((file, index) => (
              <span key={index} className='text-sm text-text-secondary-600'>
                {file.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3 Usage */}
      <div className='space-y-3 rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Step 3 Usage
        </p>
        <div>
          <p className='text-sm font-medium capitalize text-text-strong-950'>
            {displayData.usage}
          </p>
          <p className='text-sm text-text-secondary-600 mt-1'>
            {getUsageDescription(displayData.usage)}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium capitalize text-text-strong-950'>
            {displayData.privacy}
          </p>
          <p className='text-sm text-text-secondary-600 mt-1'>
            {getPrivacyDescription(displayData.privacy)}
          </p>
        </div>
      </div>

      {/* Step 4 Order Amount & Date */}
      <div className='space-y-3 rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-3 font-semibold uppercase'>
          Step 4 Order Amount & Date
        </p>
        <div className='text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>Deadline</span>
          <span className='font-medium text-text-strong-950'>
            {displayData.deadline}
          </span>
        </div>
        <div className='text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>Order Amount</span>
          <span className='font-medium text-text-strong-950'>
            {formatCurrency(displayData.amount)}
          </span>
        </div>
        <div className='text-sm text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>
            Discount{' '}
            <Tag.Root variant='gray' className='ml-1'>
              {displayData.discountCode}
            </Tag.Root>
          </span>
          <span className='font-medium text-text-strong-950'>
            -{formatCurrency(displayData.discountAmount)}
          </span>
        </div>
        <div className='text-lg mt-3 flex items-center justify-between border-t border-stroke-soft-200 pt-3'>
          <span className='text-text-secondary-600 font-medium'>
            Amount paid
          </span>
          <span className='font-semibold text-text-strong-950'>
            {formatCurrency(finalAmount)}
          </span>
        </div>
      </div>

      {/* Navigation/Action Buttons */}
      <div className='flex justify-between gap-3'>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={prevStep}
          className='flex-1'
        >
          Draft {/* Or Previous? Image shows Draft */}
        </Button.Root>
        <Button.Root
          variant='neutral'
          mode='filled'
          onClick={submitForm}
          className='flex-1'
        >
          Post
        </Button.Root>
      </div>
    </div>
  );
};

// --- Define FormData structure ---
interface FormData {
  subject?: string;
  detail?: string;
  amount?: number;
  currency?: string;
  deadline?: string; // Or Date?
  skills?: string[];
  sources?: string[];
  files?: File[]; // Or a custom File object type?
  usageOption?: string;
  privacyOption?: string;
}

// --- Main Create Job Page Component ---
export default function CreateJobPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData] = useState<FormData>({}); // Use interface, remove unused setFormData

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, stepsConfig.length));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  const submitForm = () => {
    console.log('Submitting Job:', formData); // Placeholder action
    // TODO: Add actual submission logic (API call, etc.)
  };

  // Define steps - Add actual content later
  const stepsConfig = [
    {
      title: 'Basic information',
      content: <Step1BasicInfoForm nextStep={nextStep} />,
    },
    {
      title: 'Skills',
      content: <Step2SkillsForm nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Usage',
      content: <Step3UsageForm nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Preview',
      content: (
        <Step4Preview
          formData={formData} // Pass formData here eventually
          prevStep={prevStep}
          submitForm={submitForm}
        />
      ),
    },
  ];

  const stepLabels = stepsConfig.map((s) => s.title);

  return (
    <div className='bg-bg-subtle-100 flex flex-1 px-10'>
      <VerticalStepper
        currentStep={activeStep}
        steps={stepLabels}
        onStepClick={setActiveStep}
      />
      <CreateJobMainContent
        steps={stepsConfig}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}
