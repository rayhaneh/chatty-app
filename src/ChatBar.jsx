import React, {Component} from 'react';

// RENDER CHAT BAR
class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <form className="chatbar-username" onSubmit={this.props.getNewUser}>
          <input placeholder="Your Name (Optional)" name="username"/>
        </form>
        <form className="chatbar-message" onSubmit={this.props.sendNewMessage}>
          <input placeholder="Type a message and hit ENTER" name="text" />
        </form>
      </footer>
    )
  }

}

export default ChatBar;
