import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import MediaPlayer from '@/components/MediaPlayer';
import { AnnotationProvider } from '@/context/AnnotationContext';

describe('MediaPlayer Component', () => {
  const mockSrc = '/temp_uploads/sample-1.mp4';

  test('renders video player with controls', () => {
    render(
      <AnnotationProvider>
        <MediaPlayer src={mockSrc} role="viewer" />
      </AnnotationProvider>
    );

    const videoElement = screen.getByTestId('video-player');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('controls');
  });

  test('displays current time when video plays', () => {
    render(
      <AnnotationProvider>
        <MediaPlayer src={mockSrc} role="editor" />
      </AnnotationProvider>
    );

    const videoElement = screen.getByTestId('video-player');

    Object.defineProperty(videoElement, 'currentTime', { value: 10, writable: true });
    fireEvent.timeUpdate(videoElement);
    
    const currentTimeDisplay = screen.getByText(/Current Time: 10.00 seconds/i);
    expect(currentTimeDisplay).toBeInTheDocument();
  });

  test('viewer cannot see add annotation controls', () => {
    render(
      <AnnotationProvider>
        <MediaPlayer src={mockSrc} role="viewer" />
      </AnnotationProvider>
    );

    const input = screen.queryByPlaceholderText('Add annotation');
    expect(input).not.toBeInTheDocument();

    const addButton = screen.queryByText('Add Annotation');
    expect(addButton).not.toBeInTheDocument();
  });
});
