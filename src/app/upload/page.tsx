'use client';
import React, { useState, lazy, Suspense } from 'react';
import UploadMedia from '@/components/UploadMedia';


const MediaPlayer = lazy(() => import('@/components/MediaPlayer'));

const UploadAndPlayPage = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const userRole: 'viewer' | 'editor' = 'editor';

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Upload Media</h1>
        {!fileUrl ? (
        <UploadMedia onFileUploaded={setFileUrl} />
      ) : (
        <Suspense fallback={<div>Loading player...</div>}>
         <MediaPlayer src={fileUrl} role={userRole} />
        </Suspense>
      )}
      </div>
    </main>
  );
};

export default UploadAndPlayPage;