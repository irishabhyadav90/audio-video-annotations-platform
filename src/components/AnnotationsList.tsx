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
    onAddAnnotation(annotationText);
    setAnnotationText('');
  };

  return (
    <div>
      {role === 'editor' && (
        <div>
          <p>Current Time: {currentTime.toFixed(2)} seconds</p>
          <input
            type="text"
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            placeholder="Add annotation"
            className="border p-2 mr-2"
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white p-2">
            Add Annotation
          </button>
        </div>
      )}
      <div>
        <h3>Annotations</h3>
        <ul>
          {annotations.map((annotation, index) => (
            <li key={index} data-testid="annotation-list">
              [{annotation.timestamp?.toFixed(2)}s]: {annotation.text}
              {role === 'editor' && (
                <button
                  onClick={() => onDeleteAnnotation(annotation.timestamp)}
                  className="ml-2 text-red-500"
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
