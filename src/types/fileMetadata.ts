export interface FileMetadata {
    filename: string;
    size: number;
    progress: number;
    totalChunks: number;
  }
  
  export interface UploadResponse {
    message: string;
    filePath: string;
  }
  