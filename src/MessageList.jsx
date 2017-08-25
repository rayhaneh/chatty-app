import React, {Component} from 'react'
import Message            from './Message.jsx'

// Render list of messages
class MessageList extends Component {
  render() {
    return (
      <main className='Messages'>
        {
          this.props.messages.map((message, index) =>
            <Message message={message} key={message.id}/>
            )
        }
      </main>
    );
  }
}
export default MessageList;
