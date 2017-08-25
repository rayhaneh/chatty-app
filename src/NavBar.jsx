import React, {Component} from 'react'

// Render the navbar
class NavBar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'><i className='fa fa-lg fa-comments-o' aria-hidden='true'></i>  Chatty</a>
        <div>{this.props.onlineUserCounter} user(s) online</div>
      </nav>
    );
  }
}
export default NavBar;
