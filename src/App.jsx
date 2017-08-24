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
        //   id       : 1,
        //   type     :
        //   username : "Bob",
        //   content  : "Has anyone seen my marbles?"
        // },
        // {
        //   id      : 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }
      ],
      onlineUserCount: 0,
    }
  };



  componentDidMount() {
    // Create a new WebSocket
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('Connected to the server!')

    // Wait for new messages and then add them to the DOM
    this.socket.onmessage = this.addRecievedMessage;
  };


  // Scrolls to the newest message
  componentDidUpdate() {
    const elements = document.getElementsByClassName('message-content')
    if (elements.length) {
      const element  = elements[elements.length - 1]
      element.scrollIntoView({block: "end"})
    }
  }



  // ---- Render the DOM and add listeners to some of the elements
  render() {
    return (
      <div>
        <NavBar       onlineUserCounter = {this.state.onlineUserCounter}/>
        <MessageList  messages          = {this.state.messages}
                      notification      = {this.state.notification}/>
        <ChatBar      currentUser       = {this.state.currentUser}
                      getNewUser        = {this.getNewUser}
                      sendNewMessage    = {this.sendNewMessage}/>

      </div>
    )
  };




  // ---- Get current user's name from DOM and change the state
  getNewUser = (event) => {
    event.preventDefault()

    const newNotification = {
      type    : 'incomingNotification',
      content : `${this.state.currentUser.name} changed their name to ${event.target.username.value}`
    }

    // If the name input field is empty change the current state to Anonymous
    if (!event.target.username.value) {
      this.setState({currentUser: {name: "Anonymous"}})
    }
    // else change it to the current user's name
    else{
      this.setState({currentUser: {name: event.target.username.value}})
    }



    this.socket.send(JSON.stringify(newNotification))

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
    this.socket.send(JSON.stringify(newMessage))

  };



  // ---- Add recieved messages to the DOM
  addRecievedMessage = (receivedMessage) => {
    // Parsed the recived messages object
    var newMessage = JSON.parse(receivedMessage.data)
    // Concat the message to the messages in the state
    switch(newMessage.type) {
      case "postMessage":
      case "postNotification":
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break;
      case "onlineUserCount":
        this.setState({onlineUserCounter: newMessage.count})
        break;
    }
  };

}

export default App;







