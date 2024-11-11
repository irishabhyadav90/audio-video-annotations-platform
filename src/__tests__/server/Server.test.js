import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Server } from 'mock-socket';
import MediaPlayer from '@/components/MediaPlayer';
import { AnnotationProvider } from '@/context/AnnotationContext';

let mockServer;
const port = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001';

beforeAll(() => {
  mockServer = new Server(port);
});

afterAll(() => {
  mockServer.stop();
});

test('editor can add annotations via WebSocket', async () => {
  render(
    <AnnotationProvider>
      <MediaPlayer src={'/temp_uploads/sample-1.mp4'} role="editor" />
    </AnnotationProvider>
  );

  // Send a WebSocket message to add an annotation
  mockServer.emit('message', JSON.stringify({
    type: 'add',
    annotation: { timestamp: 0, text: 'Test annotation' }
  }));

  // Wait for the annotation to appear in the DOM
  await waitFor(() => {
    const annotation = screen.getByText(/\[0\.00s\]: Test annotation/);
    expect(annotation).toBeInTheDocument();
  });
});
