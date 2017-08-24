// server.js

const express      = require('express');
const SocketServer = require('ws').Server;
const uuid         = require('uuid/v4');
var randomColor = require('randomcolor');


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

let connectionIds = []
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  ws.id = uuid()
  console.log(`Client ${ws.id} connected`);
  braodcastBackNumUsers(ws.id, true)

  // Broadcast back the recieved messages to all clients
  ws.on('message', (message) => {
    broadcastBackMessages(ws.id, message)
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log(`Client ${ws.id} connected`);
    braodcastBackNumUsers(ws.id, false)
  });
});


function braodcastBackNumUsers (id, connected) {
  if (connected) {
    connectionIds.push({id: id, color: randomColor()})
  }
  else {
    let index = connectionIds.findIndex((connection) => {
      return connection.id === id
    })
    connectionIds.splice(index, 1)
  }
  let message = {
    type : 'onlineUserCount',
    count: connectionIds.length
  }
  wss.broadcast(JSON.stringify(message));
}


function broadcastBackMessages(id, message) {
  let receivedMessage = JSON.parse(message)
  receivedMessage.id   = uuid()
  switch(receivedMessage.type) {
    case "incomingMessage":
      let index = connectionIds.findIndex((connection) => {
        return connection.id === id
      })
      receivedMessage.color = connectionIds[index].color
      receivedMessage.type = 'postMessage'
      break;
    case "incomingNotification":
      receivedMessage.type = 'postNotification'
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





