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
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg mx-auto mt-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Transcription</h3>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search transcription..."
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
      />

      <ul className="space-y-2">
        {filteredTranscription.map((line, index) => (
          <li
            key={index}
            onClick={() => onJumpToTimestamp(line.timestamp)}
            className={`p-3 rounded-lg cursor-pointer transition ${
              highlightedText?.timestamp === line.timestamp
                ? 'bg-yellow-200'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="font-semibold text-gray-600">
              [{line.timestamp}s]:{' '}
            </span>
            <span className="text-gray-800">{line.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transcription;
