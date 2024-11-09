'use client';

import { useState, ChangeEvent } from 'react';

interface UploadMediaProps {
  onFileUploaded: (url: string) => void;
}

const UploadMedia: React.FC<UploadMediaProps> = ({ onFileUploaded }) =>  {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      headers: {
        'Content-Type': file.type, // Set the correct MIME type
      },
      body: file, // Send the file as binary data
    });

    if (response.ok) {
      onFileUploaded(`/temp_uploads/${file.name}`);
      setProgress(100); // Set progress to 100% when complete
    } else {
      console.error('Upload failed');
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
    </div>
  );
};

export default UploadMedia;
