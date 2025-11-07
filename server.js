// Import the WebSocket library
const WebSocket = require('ws');

// 1️⃣ Create a new WebSocket server (this is your new websocket)
const server = new WebSocket.Server({ port: 8080 });
console.log('✅ New WebSocket Server running on ws://localhost:8080');

// 2️⃣ Connect to your old WebSocket (replace the link below with your actual old socket URL)
const oldSocket = new WebSocket('wss://quotes.livefxhub.com:9001/?token=Lkj@asd@123');

// When the old WebSocket receives a message, send it to all connected clients
oldSocket.on('message', (message) => {
  console.log('📩 Message from old socket:', message.toString());

  // Forward the same message to new WebSocket clients
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
});

oldSocket.on('open', () => console.log('✅ Connected to old WebSocket'));
oldSocket.on('close', () => console.log('❌ Old WebSocket disconnected'));
oldSocket.on('error', (err) => console.error('⚠️ Error:', err));
