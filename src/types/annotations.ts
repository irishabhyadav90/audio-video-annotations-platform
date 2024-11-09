export interface Annotation {
    timestamp: number;
    text: string
  }
  
export interface Segment {
    start: number;
    end: number;
    notes: string;
  }

export interface AnnotationContextType {
    annotations: Annotation[];
    addAnnotation: (annotation: Annotation) => void;
    deleteAnnotation: (timestamp: number) => void;
}
