# Media Collaboration System

This project is a collaborative media annotation system built with Next.js, TypeScript, and Tailwind CSS. It enables users to upload media files, view real-time annotations, and access transcriptions alongside the media. This project is designed to provide a streamlined experience for collaborative media review and annotation.

### Key Features
- **Media Upload and Playback**: Upload and play media files within the app.
- **Real-Time Annotations**: Add, view, and delete annotations in real-time using WebSockets.
- **User Presence Tracking**: View other active users and their statuses, providing a collaborative experience.
- **Searchable Transcription**: Search through transcription text, highlight keywords, and jump to specific timestamps.
- **User Roles**: Differentiated user roles (`viewer` and `editor`) with role-based access to annotation features.

## Setup Instructions

This guide will help you set up and run the Media Collaboration System locally.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v20)
- **pnpm** package manager

### 1. Clone the Repository

```bash
git clone irishabhyadav90/audio-video-annotations-platform
cd camb

```

### 2. Install dependencies

```bash
pnpm install

```
### 3. Configure Environment Variables
Create a .env.local file in the project root with the following environment variables:

```bash
# WebSocket server URL for real-time updates
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001

```

### 4. Start the WebSocket Server
In a separate terminal, start the WebSocket server to enable real-time annotation and user presence features:

```bash
 cd src/server/server.js
 node server.js

```

### 5. Start the Development server
With the WebSocket server active, start the Next.js development server:

```bash
 pnpm run dev

```

### 6. Run Tests (Optional)

Unit tests : 

```bash
 npm run test
 # or
 pnpm run test

```
E2E tests :

```bash

npx cypress open
npx cypress run

```

## Testing Notes

The Media Collaboration System includes both **Unit Tests** and **End-to-End (E2E) Tests** to verify the functionality of key components and flows.

### 1. Unit Testing

- **Framework**: Unit tests are written using **Jest** and **React Testing Library**.
- **Tested Components**:
  - **Media Player**: Tests for media playback controls, role-based annotation handling, and video interactions.
  - **Annotation List**: Verifies the ability to add, display, and delete annotations based on user role.

### 2. End-to-End (E2E) Testing

- **Framework**: **Cypress** is used for E2E tests to simulate user interactions across the application.
- **Tested Components**:
  - **Media Upload**: Simulates uploading a media file and verifies it loads and plays correctly
  - **Real-Time Annotations**: Tests annotation addition, deletion, and real-time updates for both editors and viewers.


---

### System Architecture Overview

The Media Collaboration System is designed as a single-page application with real-time collaboration features. Below is a high-level overview of the architecture.

### 1. Frontend

- **Framework**: **Next.js** with **React** and **TypeScript**
- **Components**:
  - **MediaPlayer**: Handles media playback, role-based annotations, and user activity.
  - **AnnotationList**: Manages adding, displaying, and deleting annotations.
  - **UserList**: Displays active users with real-time status updates.
  - **Transcription**: Provides searchable, clickable transcription alongside video playback.

- **Styling**: **Tailwind CSS** is used for a responsive and modern UI across components.

### 2. Real-Time Communication

- **WebSocket Server**:
  - The WebSocket server (`server.js`) is responsible for handling real-time updates in user presence, playback positions, and annotations.
  - It supports multiple users by broadcasting updates to all connected clients, ensuring synchronized interactions.

### 3. API Routes

- **Next.js API Routes**:
  - `/api/upload`: Handles media file uploads to a temporary storage folder (`temp_uploads`).

### 4. Data Flow

- **Client-Server Communication**:
  - The WebSocket server enables bi-directional, real-time communication between clients for synchronized actions like annotation updates and playback tracking.
  - API routes handle single-directional, request-response interactions (e.g., file upload).

### 5. Key Libraries

- **WebSocket**: Manages real-time annotation and user activity updates.
- **Cypress**: End-to-end testing for UI interactions and flows.
- **Jest** & **React Testing Library**: Unit testing for isolated component functionality.

### 6. Project Structure

- **`components`**: Contains React components like `MediaPlayer`, `AnnotationList`, `UserList`, and `Transcription`.
- **`pages/api`**: Contains Next.js API routes for handling server-side functionalities.
- **`public`**: Stores uploaded media files in a `temp_uploads` folder.
- **`server.js`**: Custom WebSocket server script for handling real-time interactions.
- **`cypress`**: Cypress setup and E2E test files for interactive flow testing.


## Scalability Considerations and Potential Improvements

To enhance the scalability, reliability, and performance of the Media Collaboration System, here are some recommended improvements and considerations:

### 1. Cloud File Storage Integration

- **Current Setup**: Currently, uploaded media files are stored temporarily on the server's local filesystem (`public/temp_uploads`).
- **Improvement**: Integrate a cloud-based storage solution, such as **AWS S3**, **Google Cloud Storage** to handle media files.
  - **Benefits**:
    - **Scalability**: Cloud storage automatically scales to accommodate larger numbers of files and file sizes, removing dependency on server storage limits.
    - **Availability**: Cloud storage is highly available and durable, ensuring media files remain accessible even if the application server restarts or scales.
    - **Global Access**: Cloud storage enables users from different geographic locations to access media files faster due to content delivery networks (CDNs).



### 2. WebSocket Optimization

- **Current Setup**: The WebSocket server handles real-time interactions, managing annotations, playback synchronization, and user status updates.
- **Improvements**:
  - **Load Balancing**: Deploy the WebSocket server behind a load balancer (e.g., **Nginx** ) to distribute the load evenly and prevent a single point of failure.
  - **Rate Limiting and Authentication**: Add user authentication for WebSocket connections to verify user identity and prevent unauthorized access. Rate limiting can reduce the risk of overload from excessive requests or malicious users.

- **Benefits**:
  - **Enhanced Reliability**: Multiple WebSocket servers reduce single points of failure, improving connection stability.

### 3. Full Backend Infrastructure

- **Current Setup**: The project uses Next.js API routes and a WebSocket server for backend functionality.
- **Improvement**: Implement a dedicated backend infrastructure with a framework such as **Express.js** or **NestJS** to provide a full-featured API server.
  - **Benefits**:
    - **Separation of Concerns**: A dedicated backend can handle complex business logic, data validation, and security, separating these from the frontend code.
    - **Scalability**: Dedicated backend servers can be scaled independently based on demand, improving the overall system’s scalability.

- **Additional Recommendations**:
  - **Database Integration**: Add a database (e.g., **PostgreSQL**, **MongoDB**) for persisting annotation data, user actions, and media metadata, enabling more robust data management.

### 4. Caching for Improved Performance

- **Current Setup**: Currently, caching is not implemented in the project.
- **Improvement**: Use a caching solution like **Redis**  to reduce load on the WebSocket server and API endpoints.



