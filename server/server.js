//import WebSocket 
const WebSocket = require('ws');
//import needed library for reading/writing files
const fs = require('fs').promises;

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

//logs that the server is running
console.log('WebSocket server is running on ws://localhost:8080');

//handles new connections and runs code (sends the client a welcome message whenever they connect)
wss.on('connection', async (ws) => {
  console.log('New client connected'); 
  ws.send('Welcome to the WebSocket server!');

    //sends existing spark data to client
    try {
      //reads touchData.json
      const data = await fs.readFile('touchData.json', 'utf8');
      //sends to client
      ws.send(data);
      //logs if the file is empty or doesn't exist
    } catch (e) {
      console.log('No existing spark data yet');
    }

  // handles incoming messages from clients
  //whenever user clicks on an emotion page, sends message {x, y, emotion}
  ws.on('message', async (message) => {
    // broadcast to all clients
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }

    // save to touchData.json
    try {
      let data = '[]';
      try { data = await fs.readFile('touchData.json', 'utf8'); } catch {}
      const json = JSON.parse(data);
      json.push(JSON.parse(message));
      await fs.writeFile('touchData.json', JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Error saving touchData:', e);
    }
  });

  // handles disconnections and logs when a client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});