const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.send('Welcome to the WebSocket server!');

ws.on('message', (message) => {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });

  // Close event handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});