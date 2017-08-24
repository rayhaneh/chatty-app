import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={this.props.getNewUser}>
          <input className="chatbar-username" placeholder="Your Name (Optional)" name="username"/>
        </form>
        <form onSubmit={this.props.sendNewMessage}>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" />
        </form>
      </footer>
    )
  }

}

export default ChatBar;
