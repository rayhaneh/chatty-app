import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === 'postMessage') {

      return (
        <div className="message">
          <span className="message-username">{this.props.message.color}</span>
          <span className="message-username" style={{color: 'red'}}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    }
    else {
      return (
        <div className="message system">
            {this.props.message.content}
        </div>
      )
    }
  }
}
export default Message;
