// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

// Handle connection
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Received message:', message);
   const parsedMessage = JSON.parse(message);
    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      console.log("client", client.readyState)
      if (client.readyState === WebSocket.OPEN) {
        console.log("send the message", parsedMessage)
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:3001');
