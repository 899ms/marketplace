import React from 'react';
import { RiStarFill, RiGoogleFill } from '@remixicon/react';

// --- Service Card Component ---
const ServiceCard = () => {
  // TODO: Accept props for dynamic data
  return (
    <div className='shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0'>
      <div className='h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'></div>
      <div className='p-3'>
        <p className='mb-2 line-clamp-2 font-medium text-[#0E121B] text-[14px]'>
          Draw catchy and eye-catching illustrations anime
        </p>
        <div className='text-text-secondary-600 mb-2 flex items-center gap-1 text-paragraph-xs'>
          <div className='size-5 rounded-full bg-sky-200 mr-1 text-center flex items-center justify-center text-[12px] text-[#124B68] font-medium leading-none'>E</div>{' '}
          {/* Placeholder Avatar */}
          <span className='text-[12px] text-[#222530] font-medium'>Cleve Music</span> {/* Placeholder Name */}
          {/* Placeholder Icons */}
          {/* <RiGoogleFill className='ml-1 size-4' /> */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.14258 6.72729V9.4382H11.9868C11.818 10.31 11.3114 11.0482 10.5517 11.5446L12.8699 13.3073C14.2205 12.0855 14.9998 10.291 14.9998 8.15918C14.9998 7.66283 14.9543 7.18551 14.8699 6.72737L8.14258 6.72729Z" fill="#4285F4"/>
<path d="M4.13966 9.33234L3.61681 9.72456L1.76611 11.1373C2.94145 13.4218 5.35039 15 8.14261 15C10.0712 15 11.688 14.3763 12.8699 13.3073L10.5517 11.5445C9.91532 11.9645 9.10362 12.2191 8.14261 12.2191C6.28545 12.2191 4.70756 10.9909 4.14258 9.33638L4.13966 9.33234Z" fill="#34A853"/>
<path d="M1.76619 4.86285C1.27919 5.80463 1 6.86737 1 8.00007C1 9.13278 1.27919 10.1955 1.76619 11.1373C1.76619 11.1436 4.14288 9.33003 4.14288 9.33003C4.00002 8.91003 3.91558 8.46461 3.91558 8C3.91558 7.5354 4.00002 7.08997 4.14288 6.66997L1.76619 4.86285Z" fill="#FBBC05"/>
<path d="M8.14275 3.78726C9.19473 3.78726 10.1298 4.14361 10.8766 4.83089L12.922 2.82638C11.6817 1.69368 10.0714 1 8.14275 1C5.35054 1 2.94145 2.57181 1.76611 4.86272L4.14273 6.66999C4.70764 5.01543 6.2856 3.78726 8.14275 3.78726Z" fill="#EA4335"/>
</svg>

<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.14258 6.72729V9.4382H11.9868C11.818 10.31 11.3114 11.0482 10.5517 11.5446L12.8699 13.3073C14.2205 12.0855 14.9998 10.291 14.9998 8.15918C14.9998 7.66283 14.9543 7.18551 14.8699 6.72737L8.14258 6.72729Z" fill="#4285F4"/>
<path d="M4.13966 9.33234L3.61681 9.72456L1.76611 11.1373C2.94145 13.4218 5.35039 15 8.14261 15C10.0712 15 11.688 14.3763 12.8699 13.3073L10.5517 11.5445C9.91532 11.9645 9.10362 12.2191 8.14261 12.2191C6.28545 12.2191 4.70756 10.9909 4.14258 9.33638L4.13966 9.33234Z" fill="#34A853"/>
<path d="M1.76619 4.86285C1.27919 5.80463 1 6.86737 1 8.00007C1 9.13278 1.27919 10.1955 1.76619 11.1373C1.76619 11.1436 4.14288 9.33003 4.14288 9.33003C4.00002 8.91003 3.91558 8.46461 3.91558 8C3.91558 7.5354 4.00002 7.08997 4.14288 6.66997L1.76619 4.86285Z" fill="#FBBC05"/>
<path d="M8.14275 3.78726C9.19473 3.78726 10.1298 4.14361 10.8766 4.83089L12.922 2.82638C11.6817 1.69368 10.0714 1 8.14275 1C5.35054 1 2.94145 2.57181 1.76611 4.86272L4.14273 6.66999C4.70764 5.01543 6.2856 3.78726 8.14275 3.78726Z" fill="#EA4335"/>
</svg>
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.14258 6.72729V9.4382H11.9868C11.818 10.31 11.3114 11.0482 10.5517 11.5446L12.8699 13.3073C14.2205 12.0855 14.9998 10.291 14.9998 8.15918C14.9998 7.66283 14.9543 7.18551 14.8699 6.72737L8.14258 6.72729Z" fill="#4285F4"/>
<path d="M4.13966 9.33234L3.61681 9.72456L1.76611 11.1373C2.94145 13.4218 5.35039 15 8.14261 15C10.0712 15 11.688 14.3763 12.8699 13.3073L10.5517 11.5445C9.91532 11.9645 9.10362 12.2191 8.14261 12.2191C6.28545 12.2191 4.70756 10.9909 4.14258 9.33638L4.13966 9.33234Z" fill="#34A853"/>
<path d="M1.76619 4.86285C1.27919 5.80463 1 6.86737 1 8.00007C1 9.13278 1.27919 10.1955 1.76619 11.1373C1.76619 11.1436 4.14288 9.33003 4.14288 9.33003C4.00002 8.91003 3.91558 8.46461 3.91558 8C3.91558 7.5354 4.00002 7.08997 4.14288 6.66997L1.76619 4.86285Z" fill="#FBBC05"/>
<path d="M8.14275 3.78726C9.19473 3.78726 10.1298 4.14361 10.8766 4.83089L12.922 2.82638C11.6817 1.69368 10.0714 1 8.14275 1C5.35054 1 2.94145 2.57181 1.76611 4.86272L4.14273 6.66999C4.70764 5.01543 6.2856 3.78726 8.14275 3.78726Z" fill="#EA4335"/>
</svg>
        </div>
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-4 text-yellow-500' />
            <span className='text-[12px] text-sub-600'>4.9 (125)</span> {/* Placeholder Rating */}
          </div>
          <span className='font-medium text-[16px]'><span className='text-[12px]'>$</span>101</span>{' '}
          {/* Placeholder Price */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
