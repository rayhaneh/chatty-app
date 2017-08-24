import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className={this.messageClassName(this.props.message.type)}>
        {this.messageUserName(this.props.message.type)}
        {this.messageContent(this.props.message.type)}
      </div>
    )
  }

  // Returns css class names based on the message type
  messageClassName = (messageType) => {
    if ( messageType === 'postMessage') {
      return 'message'
    }
    else {
      return 'message system'
    }
  }

  // Returns a username for messages (not notifications)
  messageUserName = (messageType) => {
    if (messageType === 'postMessage') {
      let usernameStyles = {
        color: this.props.message.color
      }
      return (
        <span className="message-username" style={usernameStyles}>{this.props.message.username}</span>
      )
    }
  }


  // Searched for
  messageContent = (messageType) => {
    // A regular expression to check if the message content has an image link
    let re = /(?:(?:https?|ftp):\/\/)?(?:w{3}\.)?\S+\.\S+\/.+\.(?:png|jpg|gif)/

    // Search for the image link in the message content
    let image = this.props.message.content.match(re)

    // If there is an image replace it with a div that includes that image
    if (image && (messageType === 'postMessage')) {
      let content = this.props.message.content.split(image[0])
      return (
        <div className="message-content">
          <span>{content[0]}</span>
          <div className="message-image"><img src={image[0]} /></div>
          <span>{content[1]}</span>
        </div>
      )
    }
    // else render the image
    else {
      return (
        <div className="message-content">
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    }
  }


}

export default Message





