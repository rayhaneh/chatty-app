// server.js

const express      = require('express');
const SocketServer = require('ws').Server;
const uuid         = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${ PORT }`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast back the recieved messages to all clients
  ws.on('message', broadcastBack)

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});



function broadcastBack(message) {
  let receivedMessage = JSON.parse(message)

  switch(receivedMessage.type) {
    case "incomingMessage":
      receivedMessage.type = 'postMessage'
      receivedMessage.id   = uuid()
      console.log(`${receivedMessage.id}, ${receivedMessage.type}: User '${receivedMessage.username}' said '${receivedMessage.content}'`)
      break;
    case "incomingNotification":
      // handle incoming notification
      break;
    default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
  }

  wss.broadcast(JSON.stringify(receivedMessage));
}



// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};





