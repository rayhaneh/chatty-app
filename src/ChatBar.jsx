import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.props.getNewUser}
        className="chatbar-username" placeholder="Your Name (Optional)" name="username"/>
        <form onSubmit={this.props.sendNewMessage}>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" />
        </form>
      </footer>
    )
  }

}

export default ChatBar;
