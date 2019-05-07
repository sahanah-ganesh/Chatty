import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="userInput" placeholder={this.props.currentUser.name} />
        <input onKeyUp={this.props.addMessage} name="messageInput" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
