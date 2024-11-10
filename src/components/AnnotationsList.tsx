import React, { useState } from 'react';
import { Annotation } from '@/types/annotations';

interface AnnotationListProps {
  role: 'viewer' | 'editor';
  annotations: Annotation[];
  currentTime: number;
  onAddAnnotation: (text: string) => void;
  onDeleteAnnotation: (timestamp: number) => void;
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  role,
  annotations,
  currentTime,
  onAddAnnotation,
  onDeleteAnnotation,
}) => {
  const [annotationText, setAnnotationText] = useState<string>('');

  const handleAdd = () => {
    if (annotationText.trim()) {
      onAddAnnotation(annotationText);
      setAnnotationText('');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg mx-auto mb-6">
      {role === 'editor' && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-2">Current Time: {currentTime.toFixed(2)} seconds</p>
          <div className="flex items-center">
            <input
              type="text"
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Add annotation..."
              className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Add
            </button>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Annotations</h3>
        <ul className="space-y-3">
          {annotations.map((annotation, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
              data-testid="annotation-list"
            >
              <div>
                <p className="text-gray-800">
                  [{annotation.timestamp?.toFixed(2)}s]: {annotation.text}
                </p>
              </div>
              {role === 'editor' && (
                <button
                  onClick={() => onDeleteAnnotation(annotation.timestamp)}
                  className="text-red-500 hover:text-red-600 font-medium transition duration-200"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnnotationList;
