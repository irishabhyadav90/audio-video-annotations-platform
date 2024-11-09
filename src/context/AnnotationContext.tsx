"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Annotation, AnnotationContextType } from '@/types/annotations';

export const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

export const AnnotationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const addAnnotation = (annotation: Annotation) => setAnnotations((prev) => [...prev, annotation]);

  const deleteAnnotation = (timestamp: number) => {
    setAnnotations((prev) => prev.filter((a) => a.timestamp !== timestamp));
  };

  return (
    <AnnotationContext.Provider value={{ annotations, addAnnotation, deleteAnnotation }}>
      {children}
    </AnnotationContext.Provider>
  );
};

