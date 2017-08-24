import React, {Component} from 'react';

class Message extends Component {
  render() {
    let re = /(?:(?:https?|ftp):\/\/)?(?:w{3}\.)?\S+\.\S+\/.+\.(?:png|jpg|gif)/

    if (this.props.message.type === 'postMessage') {
      let image = this.props.message.content.match(re)
      if (!image) {

        return (
          <div className="message">
            <span className="message-username">{this.props.message.color}</span>
            <span className="message-username" style={{color: 'red'}}>{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        )
      }
      else {
        let content = this.props.message.content.split(image[0])
        return (
          <div className="message">
            <span className="message-username">{this.props.message.color}</span>
            <span className="message-username" style={{color: 'red'}}>{this.props.message.username}</span>
            <div className="message-content">
              <span>{content[0]}</span>
              <div className="message-image"><img src={image[0]} /></div>
              <span>{content[1]}</span>
            </div>
          </div>
        )
      }

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
