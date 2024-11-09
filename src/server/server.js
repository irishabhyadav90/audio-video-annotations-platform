// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

const users = {}; 

// Handle connection
wss.on('connection', (ws) => {
  console.log('New client connected');

   // Assign a unique ID to each client (for simplicity, use the WebSocket instance as the ID) 
   const userId = ws._socket.remoteAddress + ":" + ws._socket.remotePort;

   users[userId] = { id: userId, status: 'Viewing', currentTime: 0 };
  
  // Notify all clients of the new user list
  broadcastUsers();

  // Handle incoming messages
  ws.on('message', (message) => {
   const parsedMessage = JSON.parse(message);
   if (parsedMessage.type === 'status') {
    // Update user status (e.g., Viewing, Annotating, Idle)
    users[userId].status = parsedMessage.status;
    broadcastUsers();
  } else if (parsedMessage.type === 'position') {
    // Update user's playback position
    users[userId].currentTime = parsedMessage.currentTime;
    broadcastUsers();
  } else if (parsedMessage.type === 'add') {
    // Broadcast new annotation to all clients
    broadcastMessage({ type: 'add', annotation: parsedMessage.annotation });

  } else if (parsedMessage.type === 'delete') {
    // Broadcast deletion to all clients
    broadcastMessage({ type: 'delete', timestamp: parsedMessage.timestamp });
  }
  });

  // Handle disconnection
  ws.on('close', () => {
    delete users[userId];
    broadcastUsers();
    console.log('Client disconnected');
  });
});

// Broadcast the list of users to all connected clients
function broadcastUsers() {
  const userList = Object.values(users);
  const message = JSON.stringify({ type: 'userList', users: userList });
 
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("sent message:", message);
      client.send(message);
    }
  });
}

// Broadcast messages (annotations) to all connected clients
function broadcastMessage(data) {
  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

console.log('WebSocket server is running on ws://localhost:3001');
