// Transcription.tsx
import React from 'react';

interface TranscriptionProps {
  transcription: { timestamp: number; text: string }[];
  currentTime: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onJumpToTimestamp: (timestamp: number) => void;
}

const Transcription: React.FC<TranscriptionProps> = ({
  transcription,
  currentTime,
  searchTerm,
  onSearchChange,
  onJumpToTimestamp,
}) => {
  const highlightedText = transcription.find(
    (line) => Math.abs(line.timestamp - currentTime) < 2
  );

  const filteredTranscription = searchTerm
    ? transcription.filter((line) =>
        line.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transcription;

  return (
    <div className="mt-4">
      <h3>Transcription</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search transcription"
        className="border p-2 mb-2"
      />
      <ul>
        {filteredTranscription.map((line, index) => (
          <li
            key={index}
            onClick={() => onJumpToTimestamp(line.timestamp)}
            className={`cursor-pointer ${
              highlightedText?.timestamp === line.timestamp ? 'bg-yellow-300' : ''
            }`}
          >
            [{line.timestamp}s]: {line.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transcription;
