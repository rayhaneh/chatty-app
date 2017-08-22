import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar     from './ChatBar.jsx'
import NavBar      from './NavBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }


  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }



  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} handleNewUser={this.handleNewUser} handleNewMessage={this.handleNewMessage}/>
      </div>
    )
  };


  handleNewMessage = (e) => {
    e.preventDefault()
    const newMessage = {username: this.state.currentUser.name, content: e.target.text.value};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    e.target.text.value = ''
  };

  handleNewUser = (e) => {
    e.preventDefault()
    // If the name input field is empty
    if (!e.target.value) {
      this.state.currentUser.name = 'Anonymous'
    }
    else{
      this.state.currentUser.name = e.target.value
    }
  };



}

export default App;







