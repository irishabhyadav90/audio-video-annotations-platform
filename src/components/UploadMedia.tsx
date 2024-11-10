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
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg w-full shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Upload Your Media</h2>
      <p className="text-sm mb-4">Choose a file to start uploading</p>
      
      <label className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-full cursor-pointer shadow-md hover:bg-indigo-500 hover:text-white transition duration-200">
        <input type="file" onChange={handleFileChange} className="hidden" />
        {file ? file.name : 'Select File'}
      </label>

      <button
        onClick={handleUpload}
        className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out ${
          !file ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
        disabled={!file}
      >
        Upload File
      </button>

      {progress > 0 && (
        <div className="w-full bg-gray-300 rounded-full mt-4">
          <div
            className="bg-green-500 text-xs font-medium text-green-100 text-center p-1 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}% Uploaded
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMedia;
