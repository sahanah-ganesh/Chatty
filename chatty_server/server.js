
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  //Broadcast to all
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
      console.log("data", data);
    });
  };

  client.on('message', (msg) => {
    const incoming = JSON.parse(msg);
    console.log('msg', msg);
    incoming.message.id = uuidV1();
    console.log('msg id', incoming.message.id);
    switch (incoming.message.type) {
      case 'postNotification':
        incoming.message.type = 'incomingNotification';
        break;
      case 'postMessage':
        incoming.message.type = 'incomingMessage';
        break;
    }
    wss.broadcast(incoming);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});
