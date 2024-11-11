'use client';
import React, { useState, lazy, Suspense } from 'react';
import UploadMedia from '@/components/UploadMedia';
import { AnnotationProvider } from '@/context/AnnotationContext';


const MediaPlayer = lazy(() => import('@/components/MediaPlayer'));

const UploadAndPlayPage = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const userRole: 'viewer' | 'editor' = 'editor';

  return (
    <AnnotationProvider>
     <div className="flex items-center justify-center h-screen w-full bg-gray-100 overflow-y-auto">
      <div className='min-w-fit mx-auto h-full py-8'>
        {!fileUrl ? (
        <UploadMedia onFileUploaded={setFileUrl} />
      ) : (
        <Suspense fallback={<div>Loading player...</div>}>
         <MediaPlayer src={fileUrl} role={userRole} />
        </Suspense>
      )}
      </div>
     </div>
    </AnnotationProvider>
  );
};

export default UploadAndPlayPage;
