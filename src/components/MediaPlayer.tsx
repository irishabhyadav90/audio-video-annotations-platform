import React, { useRef, useState, useEffect } from 'react';
import { Annotation } from '@/types/annotations';
import { useAnnotations } from '@/hooks/useAnnotations';
import VideoPlayer from './VideoPlayer';
import UserList from './UserList';
import AnnotationList from './AnnotationsList';
import Transcription from './Transcription';

interface MediaPlayerProps {
    src: string;
    role: 'viewer' | 'editor';
}

// Mock transcription data
const mockTranscription = [
    { timestamp: 0, text: 'This is the beginning of the video.' },
    { timestamp: 5, text: 'This part covers the basics of our topic.' },
    { timestamp: 10, text: 'Now we delve deeper into the subject.' },
    { timestamp: 15, text: 'This section explains the key concepts.' },
    { timestamp: 20, text: 'Finally, we wrap up the discussion.' },
];


const MediaPlayer: React.FC<MediaPlayerProps> = ({ src, role }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [users, setUsers] = useState<{ id: string; status: string; currentTime: number }[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    const { annotations, addAnnotation, deleteAnnotation } = useAnnotations();
    
    const port = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';
    
    useEffect(() => {
        // Initialize WebSocket connection
        wsRef.current = new WebSocket(port);

        wsRef.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        wsRef.current.onmessage = async (event) => {
            const dataText = await event.data;
            const message = JSON.parse(dataText);

            console.log("on client end", message)
            if (message.type === 'userList') {
                // Update the list of users and their statuses
                setUsers(message.users);
            }
            else if (message.type === 'delete') {
                // Handle deletion by removing the annotation with the specified timestamp
                deleteAnnotation(message.timestamp);
            } else if(message.type === 'add') {
                // Handle addition of new annotation
                addAnnotation(message.annotation);
            }
        };

        wsRef.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // Cleanup WebSocket on component unmount
        return () => {
            wsRef.current?.close();
        };
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);

            // Send playback position to WebSocket server
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: 'position', currentTime: time }));
            }
        }
    };

    const handleAddAnnotation = (annotationText:string) => {
        if (role !== 'editor') return;
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const newAnnotation: Annotation = { timestamp: currentTime, text: annotationText };
        wsRef.current.send(JSON.stringify({ type: 'add', annotation: newAnnotation })); // Send annotation to WebSocket server
        // addAnnotation({ timestamp: currentTime, text: annotationText });
    };

    const handleDeleteAnnotation = (timestamp: number) => {
        if (role !== 'editor') return; // Only editors can delete annotations

        deleteAnnotation(timestamp);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'delete', timestamp }));
        }
    };

    const handleJumpToTimestamp = (timestamp: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
        }
    };

     const handleStatusChange = (status: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'status', status }));
        }
    };
    
    return (
        <div>
            <VideoPlayer
                ref={videoRef}  // Pass ref to VideoPlayer
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => handleStatusChange('Viewing')}
                onPause={() => handleStatusChange('Idle')}
            />
           <UserList users={users} />
             <AnnotationList
                role={role}
                annotations={annotations}
                currentTime={currentTime}
                onAddAnnotation={handleAddAnnotation}
                onDeleteAnnotation={handleDeleteAnnotation}
            />
            <Transcription
                transcription={mockTranscription}
                currentTime={currentTime}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onJumpToTimestamp={handleJumpToTimestamp}
            />
        </div>
    );
};

export default MediaPlayer;
