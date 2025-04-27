'use client';

import React, { useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiDeleteBinLine,
  RiLinksLine,
  RiLoader2Fill,
  RiUploadCloud2Line,
  RiInformationLine,
} from '@remixicon/react';

import * as Button from '@/components/ui/button';
import * as CompactButton from '@/components/ui/compact-button';
import * as Divider from '@/components/ui/divider';
import * as FileFormatIcon from '@/components/ui/file-format-icon';
import * as FileUpload from '@/components/ui/file-upload';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Modal from '@/components/ui/modal';
import * as ProgressBar from '@/components/ui/progress-bar';
import * as Checkbox from '@/components/ui/checkbox';
import * as Badge from '@/components/ui/badge';
import * as Tag from '@/components/ui/tag';
import { cn } from '@/utils/cn';

function IconInfoCustomFill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      fill='none'
      viewBox='0 0 20 20'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10 16.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm1.116-3.041l.1-.408a1.709 1.709 0 01-.25.083 1.176 1.176 0 01-.308.048c-.193 0-.329-.032-.407-.095-.079-.064-.118-.184-.118-.359a3.514 3.514 0 01.118-.672l.373-1.318c.037-.121.062-.255.075-.4a3.73 3.73 0 00.02-.304.866.866 0 00-.292-.678c-.195-.174-.473-.26-.833-.26-.2 0-.412.035-.636.106a9.37 9.37 0 00-.704.256l-.1.409a3.49 3.49 0 01.262-.087c.101-.03.2-.045.297-.045.198 0 .331.034.4.1.07.066.105.185.105.354 0 .093-.01.197-.034.31a6.216 6.216 0 01-.084.36l-.374 1.325c-.033.14-.058.264-.073.374a2.42 2.42 0 00-.022.325c0 .272.1.496.301.673.201.177.483.265.846.265.236 0 .443-.03.621-.092s.417-.152.717-.27zM11.05 7.85a.772.772 0 00.26-.587.78.78 0 00-.26-.59.885.885 0 00-.628-.244.893.893 0 00-.63.244.778.778 0 00-.264.59c0 .23.088.426.263.587a.897.897 0 00.63.243.888.888 0 00.629-.243z'
        clipRule='evenodd'
      />
    </svg>
  );
}

interface BlockFileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BlockFileUploadDialog({
  open,
  onOpenChange,
}: BlockFileUploadDialogProps) {
  const [tags, setTags] = useState<string[]>([
    'Digital Painting',
    'Retrowave',
    'NFT',
  ]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '' && tags.length < 8) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className='max-w-[440px] shadow-custom-md'>
        <Modal.Header
          icon={RiUploadCloud2Line}
          title='Upload files'
          description='Select and upload the files of your choice'
        />
        <Modal.Body className='space-y-6'>
          <div className='space-y-4'>
            <FileUpload.Root>
              <input multiple type='file' tabIndex={-1} className='hidden' />
              <FileUpload.Icon as={RiUploadCloud2Line} />
              <div className='space-y-1.5'>
                <div className='text-label-sm text-text-strong-950'>
                  Choose a file or drag & drop it here
                </div>
                <div className='text-paragraph-xs text-text-sub-600'>
                  JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
                </div>
              </div>
              <FileUpload.Button>Browse File</FileUpload.Button>
            </FileUpload.Root>
            <div className='space-y-4'>
              <div className='flex w-full flex-col gap-4 rounded-2xl border border-stroke-soft-200 p-4 pl-3.5'>
                <div className='flex gap-3'>
                  <FileFormatIcon.Root format='PDF' color='red' />
                  <div className='flex-1 space-y-1'>
                    <div className='text-label-sm text-text-strong-950'>
                      my-cv.pdf
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-paragraph-xs text-text-sub-600'>
                        60 KB of 120 KB
                      </span>
                      <span className='text-paragraph-xs text-text-sub-600'>
                        ∙
                      </span>
                      <RiLoader2Fill className='size-4 shrink-0 animate-spin text-primary-base' />
                      <span className='text-paragraph-xs text-text-strong-950'>
                        Uploading...
                      </span>
                    </div>
                  </div>
                  <CompactButton.Root
                    variant='ghost'
                    size='medium'
                    tabIndex={-1}
                  >
                    <CompactButton.Icon as={RiCloseLine} />
                  </CompactButton.Root>
                </div>
                <ProgressBar.Root value={50} />
              </div>
            </div>
          </div>
          <Divider.Root variant='line-text'>OR</Divider.Root>
          <div className='flex flex-col gap-1'>
            <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
              Import from URL Link
              <IconInfoCustomFill className='size-4 text-text-disabled-300' />
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Icon as={RiLinksLine} />
                <Input.Input placeholder='Paste file URL' />
              </Input.Wrapper>
            </Input.Root>
          </div>
          <div className='flex flex-col gap-1'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Subject (Optional)
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input placeholder='Question' />
              </Input.Wrapper>
            </Input.Root>
          </div>
          <div className='flex flex-col gap-1'>
            <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
              Add Tags (max. 8)
              <RiInformationLine className='text-icon-secondary-400 size-4' />
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  placeholder='Pixel Art'
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </Input.Wrapper>
            </Input.Root>
            {tags.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-1.5'>
                {tags.map((tag, index) => (
                  <Tag.Root key={index} variant='stroke' className='pl-2'>
                    {tag}
                    <Tag.DismissButton onClick={() => handleRemoveTag(tag)} />
                  </Tag.Root>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-3'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Display Preferences
            </Label.Root>
            <div className='flex items-center gap-3'>
              <Checkbox.Root id='display-profile' defaultChecked />
              <Label.Root
                htmlFor='display-profile'
                className='text-text-secondary-600 flex items-center gap-1.5 text-paragraph-sm font-normal'
              >
                Display on profile
                <Badge.Root size='small' color='yellow' className='ml-1'>
                  NEW
                </Badge.Root>
              </Label.Root>
            </div>
            <div className='flex items-center gap-3'>
              <Checkbox.Root id='disable-commenting' />
              <Label.Root
                htmlFor='disable-commenting'
                className='text-text-secondary-600 text-paragraph-sm font-normal'
              >
                Disable commenting
              </Label.Root>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button.Root
            variant='neutral'
            mode='stroke'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button.Root>
          <Button.Root
            variant='neutral'
            mode='filled'
            onClick={() => onOpenChange(false)}
          >
            Upload
          </Button.Root>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
