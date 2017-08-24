import React, {Component} from 'react'
import renderHTML         from 'react-render-html'


class Message extends Component {

  // RENDERS MESSAGES
  render() {
    return (
      <div className={this.messageClassName(this.props.message.type)}>
        {this.messageUserName(this.props.message.type)}
        {this.messageContent(this.props.message.type)}
      </div>
    )
  }




  // RETURNS CSS CLASS NAME BASED ON MESSAGE TYPE
  messageClassName = (messageType) => {
    if ( messageType === 'userMessage') {
      return 'message'
    }
    else {
      return 'message system'
    }
  }

  // RETURNS USERNAME ELEMENT BASED ON MESSAGE TYPE
  messageUserName = (messageType) => {
    if (messageType === 'userMessage') {
      let usernameStyles = {
        color: this.props.message.color
      }
      return (
        <span className="message-username" style={usernameStyles}> <i className="fa fa-user" aria-hidden="true"></i> {this.props.message.username}</span>
      )
    }
    else {
      return ''
    }
  }


  // RETURN MESSAGE CONTENT ELEMENT BASED ON THE MESSAGE TYPE AND EXISTENCE OF AN IMAGE
  messageContent = (messageType) => {

    // If the message is a user message
    if (messageType === 'userMessage') {
      // A non greedy regular expression to check if the message content has any image link
      let re = /(?:(?:https?|ftp):\/\/)?(?:w{3}\.)?\S+\.\S+\/.+?\.(?:png|jpg|gif)/ig

      let content = this.props.message.content

      content = content.replace(re,'<div className="message-image"><img src="$&"></div>')

      return (
        <div className="message-content">
          <span>{renderHTML(content)}</span>
        </div>
      )
    }
    // If the message is a system message
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





