// VideoPlayer.tsx
import React, { forwardRef } from 'react';

interface VideoPlayerProps {
  src: string;
  onTimeUpdate: () => void;
  onPlay: () => void;
  onPause: () => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, onTimeUpdate, onPlay, onPause }, ref) => (
    <div className="video-container max-w-lg mx-auto mb-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
     <video
      ref={ref}  // Forward ref to video element
      src={src}
      controls
      onTimeUpdate={onTimeUpdate}
      onPlay={onPlay}
      onPause={onPause}
      className="w-full max-w-lg"
      data-testid="video-player"
    />
    </div> 
  )
);


export default VideoPlayer;
