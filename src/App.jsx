import React, {Component} from 'react'
import MessageList        from './MessageList.jsx'
import ChatBar            from './ChatBar.jsx'
import NavBar             from './NavBar.jsx'
import renderHTML         from 'react-render-html';


class App extends Component {

  // INITIAL STATES
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      onlineUserCount: 0,
    }
  };

  // ON COMPONENT MOUNT:
  componentDidMount() {
    // Create a WebSocket
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('Connected to the server!')

    // Wait for new messages and then add them to the DOM
    this.socket.onmessage = this.addRecievedMessage;
  };


  // ON COMPONENT UPDATE:
  componentDidUpdate() {
    // Scroll to the last message after each updated
    const elements = document.getElementsByClassName('message-content')
    if (elements.length) {
      const element  = elements[elements.length - 1]
      element.scrollIntoView({block: "end"})
    }
  }


  // DOM RENDER
  render() {
    return (
      <div>
        <NavBar       onlineUserCounter = {this.state.onlineUserCounter}/>
        <MessageList  messages          = {this.state.messages}/>
        <ChatBar      currentUser       = {this.state.currentUser}
                      getNewUser        = {this.getNewUser}
                      sendNewMessage    = {this.sendNewMessage}/>
      </div>
    )
  }




  // SEND A MESSAGE TO THE SERVER AFTER USER UPDATES THEIR NAME
  getNewUser = (event) => {

    event.preventDefault()

    // Create a new message object to send to the server
    const newSystemMessage = {
      type    : 'systemMessage',
      content : `${this.state.currentUser.name} changed their name to ${event.target.username.value}`
    }

    // If the name input field is empty change the current state to Anonymous
    if (!event.target.username.value) {
      this.setState({currentUser: {name: "Anonymous"}})
    }
    // else change it to the new username
    else{
      this.setState({currentUser: {name: event.target.username.value}})
    }

    // Send the change name notification to the server
    this.socket.send(JSON.stringify(newSystemMessage))

  }



  // SEND THE NEW MESSAGE TO THE SERVER TO BE BRODCASTED
  sendNewMessage = (event) => {

    event.preventDefault()

    // Create a new message object to send to the server
    const newMessage = {
      // Get user from the state (updated by getUser function)
      type      : 'userMessage',
      username  : this.state.currentUser.name,
      content   : event.target.text.value
    };

    // Clear the textarea after user hit enter
    event.target.text.value = ''

    // Send the message to the server
    this.socket.send(JSON.stringify(newMessage))

  }



  // UPDATE THE STATE WITH THE NEW MESSAGES
  addRecievedMessage = (receivedMessage) => {
    // Parsed the recived messages object
    var newMessage = JSON.parse(receivedMessage.data)
    // Concat the message to the messages in the state
    switch(newMessage.type) {
      case "userMessage":
      case "systemMessage":
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break;
      case "onlineUserCount":
        this.setState({onlineUserCounter: newMessage.count})
        break;
    }
  }

}

export default App;







