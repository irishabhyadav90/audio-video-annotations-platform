import React, { useRef, useState, useEffect } from 'react';
import { Annotation } from '@/types/annotations';
import { useAnnotations } from '@/hooks/useAnnotations';

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
    // const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [annotationText, setAnnotationText] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [users, setUsers] = useState<{ id: string; status: string; currentTime: number }[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    const { annotations, addAnnotation, deleteAnnotation } = useAnnotations();

    useEffect(() => {
        // Initialize WebSocket connection
        wsRef.current = new WebSocket('ws://localhost:3001');

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

    const handleAddAnnotation = () => {
        if (role !== 'editor') return;
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const newAnnotation: Annotation = { timestamp: currentTime, text: annotationText };
        wsRef.current.send(JSON.stringify({ type: 'add', annotation: newAnnotation })); // Send annotation to WebSocket server
        addAnnotation({ timestamp: currentTime, text: annotationText });
        setAnnotationText('');
    };

    const handleDeleteAnnotation = (timestamp: number) => {
        if (role !== 'editor') return; // Only editors can delete annotations

        deleteAnnotation(timestamp);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'delete', timestamp }));
        }
    };

    // Filter transcription to show based on current playback time for karaoke-style highlighting
    const highlightedText = mockTranscription.find(
        (line) => Math.abs(line.timestamp - currentTime) < 2 // Highlight within 2-second range
    );

    // Handle search functionality to filter transcription based on keywords
    const filteredTranscription = searchTerm
        ? mockTranscription.filter((line) =>
            line.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : mockTranscription;

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
            <video
                ref={videoRef}
                src={src}
                controls
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => handleStatusChange('Viewing')}
                onPause={() => handleStatusChange('Idle')}
                className="w-full max-w-lg"
            />
            <div>
                <h3>Users</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.id} - {user.status} at {user.currentTime.toFixed(2)}s
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {role === 'editor' && <div>
                    <p>Current Time: {currentTime.toFixed(2)} seconds</p>
                    <input
                        type="text"
                        value={annotationText}
                        onChange={(e) => setAnnotationText(e.target.value)}
                        placeholder="Add annotation"
                        className="border p-2 mr-2"
                    />
                    <button onClick={handleAddAnnotation} className="bg-blue-500 text-white p-2">
                        Add Annotation
                    </button>
                </div>}
                <div>
                    <h3>Annotations</h3>
                    <ul>
                        {annotations.map((annotation, index) => (
                            <li key={index}>
                                [{annotation.timestamp?.toFixed(2)}s]: {annotation.text}
                                {role === 'editor' && (
                                    <button onClick={() => handleDeleteAnnotation(annotation.timestamp)} className="ml-2 text-red-500">
                                        Delete
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Transcription with search and highlighting */}
                <div className="mt-4">
                    <h3>Transcription</h3>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search transcription"
                        className="border p-2 mb-2"
                    />
                    <ul>
                        {filteredTranscription.map((line, index) => (
                            <li
                                key={index}
                                onClick={() => handleJumpToTimestamp(line.timestamp)}
                                className={`cursor-pointer ${highlightedText?.timestamp === line.timestamp ? 'bg-yellow-300' : ''
                                    }`}
                            >
                                [{line.timestamp}s]: {line.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MediaPlayer;
