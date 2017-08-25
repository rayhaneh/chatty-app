// Required Packages
const express      = require('express')
const SocketServer = require('ws').Server
const uuid         = require('uuid/v4')
var   randomColor  = require('randomcolor')


// Set the port to 3001
const PORT = 3001


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${ PORT }`)
  )

// Create the WebSockets server
const wss = new SocketServer({ server });

// An empty array of objects that will hold client ids and colors
let connections = []

// A callback that will run when a client connects to the server
wss.on('connection', (ws) => {
  ws.id = uuid()
  console.log(`Client ${ws.id} connected`)
  braodcastBackNumUsers(ws.id, true)

  // Broadcast back the recieved messages to all clients
  ws.on('message', (message) => {
    broadcastBackMessages(ws.id, message)
  })

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`)
    braodcastBackNumUsers(ws.id, false)
  })
})



// Handle user connections and disconnections
function braodcastBackNumUsers (id, connected) {
  // Assigns an id and a random color when user connects
  if (connected) {
    connections.push({id: id, color: randomColor()})
  }
  // Remove the connection from the list when user disconnects
  else {
    let index = connections.findIndex((connection) => {
      return connection.id === id
    })
    connections.splice(index, 1)
  }
  // Broadcast the number of online users
  let message = {
    type : 'onlineUserCount',
    count: connections.length
  }
  wss.broadcast(JSON.stringify(message))
}


// Handle the messages comming from users
function broadcastBackMessages(id, message) {
  // The server receives two types of messages
  // -- user messages
  // -- system messages

  let receivedMessage = JSON.parse(message)
  // 1) Assign an id to that message
  receivedMessage.id   = uuid()
  // 2) Attach the corresponding user (connection) color to that message
  let index = connections.findIndex((connection) => {
    return connection.id === id
  })
  receivedMessage.color = connections[index].color
  // 3) Broadcast the message
  wss.broadcast(JSON.stringify(receivedMessage));
}



// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};





