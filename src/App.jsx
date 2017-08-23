import React, {Component} from 'react'
import MessageList from './MessageList.jsx'
import ChatBar     from './ChatBar.jsx'
import NavBar      from './NavBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [
        // {
        //   id      : 1,
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?",
        // },
        // {
        //   id      : 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }
      ]
    }
  };



  componentDidMount() {
    // Create a new WebSocket
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('Connected to the server!')

    // Wait for new messages and then add them to the DOM
    this.socket.onmessage = this.addRecievedMessage;
  };



  // ---- Render the DOM and add listeners to some of the elements
  render() {
    return (
      <div>
        <NavBar/>
        <MessageList  messages       = {this.state.messages}/>
        <ChatBar      currentUser    = {this.state.currentUser}
                      getNewUser     = {this.getNewUser}
                      sendNewMessage = {this.sendNewMessage}/>

      </div>
    )
  };




  // ---- Get current user's name from DOM and change the state
  getNewUser = (event) => {
    event.preventDefault()
    // If the name input field is empty change the current state to Anonymous
    if (!event.target.value) {
      this.setState({currentUser: {name: "Anonymous"}})
      // this.state.currentUser.name = 'Anonymous'
    }
    // else change it to the current user's name
    else{
      this.setState({currentUser: {name: event.target.value}})
      // this.state.currentUser.name = event.target.value
    }
  };



  // ---- Get new messages from DOM and send them to the server
  sendNewMessage = (event) => {
    // Prevent the page from being reloaded everytime user submits a text
    event.preventDefault()

    // Create a new message object
    const newMessage = {
      // Get user from the state (updated by getUser function)
      type      : 'incomingMessage',
      username  : this.state.currentUser.name,
      content   : event.target.text.value
    };

    // Clear the textarea
    event.target.text.value = ''

    // Send the message to the server
    this.socket.send(JSON.stringify(newMessage));

  };



  // ---- Add recieved messages to the DOM
  addRecievedMessage = (receivedMessage) => {
    // Parsed the recived messages object
    var newMessage = JSON.parse(receivedMessage.data)
    // Concat the message to the messages in the state
    switch(data.type) {
      case "postMessage":
        const messages = this.state.messages.concat(newMessage)
        // Set the new state
        this.setState({messages: messages})
        // handle post message
        break;
      case "postNotification":
        // handle post notification
        break;
    }
  };

}

export default App;







