import WebSocket, { WebSocketServer } from 'ws';

// Create a WebSocket server
const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

// Connect to your old WebSocket
const oldSocket = new WebSocket('wss://quotes.livefxhub.com:9001/?token=Lkj@asd@123');

oldSocket.on('open', () => {
  console.log('✅ Connected to old WebSocket');
});

oldSocket.on('message', (data) => {
  // Broadcast messages from old socket to all connected new clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data.toString());
    }
  });
});

oldSocket.on('close', () => console.log('❌ Old socket closed'));
oldSocket.on('error', (err) => console.error('⚠️ Error:', err.message));

wss.on('connection', (ws) => {
  console.log('🟢 New client connected');

  ws.on('close', () => console.log('🔴 Client disconnected'));
});

console.log(`🚀 WebSocket server running on port ${process.env.PORT || 8080}`);

