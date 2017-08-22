import React, {Component} from 'react';



class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.props.handleNewUser}
        className="chatbar-username" placeholder="Your Name (Optional)" name="username"/>
        <form onSubmit={this.props.handleNewMessage}>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" />
        </form>
      </footer>
    )
  }

}



// class ChatBar extends Component {
//   render() {
//     return (
//       <footer className="chatbar">
//       <form onSubmit={this.props.handleNewMessage}>
//         <input type="text"
//         className="chatbar-username" placeholder="Your Name (Optional)"
//         defaultValue={this.props.currentUser.name} name="username"/>
//         <input type="text" className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" />
//         <input type="submit"/>
//       </form>
//       </footer>
//     )
//   }

// }


// class ChatBar extends Component {
//   render() {
//     return (
//       <footer className="chatbar">
//         <input
//         className="chatbar-username" placeholder="Your Name (Optional)"
//         defaultValue={this.props.currentUser.name} name="username"/>
//         <form onSubmit={this.props.handleNewMessage}>
//           <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" />
//         </form>
//       </footer>
//     )
//   }

// }


export default ChatBar;
