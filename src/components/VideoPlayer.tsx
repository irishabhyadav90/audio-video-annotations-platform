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
  )
);


export default VideoPlayer;
