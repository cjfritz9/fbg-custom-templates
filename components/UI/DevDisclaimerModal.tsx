'use client';

import React, { useEffect } from 'react';
import { IoMdDownload } from 'react-icons/io';

const DevDisclaimerModal: React.FC = () => {
  const handleDownload = () => {
    const pdfUrl = 'LaunchDayEvent.ics';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = '/public/LaunchDayEvent.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    //@ts-ignore
    document.getElementById('dev-disclaimer').showModal();
  }, []);

  return (
    <>
      <dialog id='dev-disclaimer' className='modal'>
        <div className='modal-box text-primary'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg'>Welcome to Full Blast!</h3>
          <p className='py-4'>
            This website is currently under development and is being used for
            testing purposes only.
          </p>
          <p className='py-4'>
            Please join us when the site goes live January 15th!
          </p>
          <span
            className='flex gap-2 text-lg items-center cursor-pointer py-4 text-blue-600'
            onClick={handleDownload}
          >
            <p className=''>Remind Me</p>
            <IoMdDownload />
          </span>
        </div>
      </dialog>
    </>
  );
};

export default DevDisclaimerModal;
