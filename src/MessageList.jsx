import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    // If message type is incomingNotification (username change) and render notification with old and new usernames
    let messageContent = this.props.messages.map((message) => {
      if (message.type === 'incomingNotification') {
        return (
          <div key={message.id} className='message system'>
            <span className='notification-content' content={message.content}>{message.oldUser} changed their name to {message.newUser}</span>
          </div>
        );
      }
      // Else return message and username
       return ( <Message key={message.id} username={message.username} content={message.content} /> );
    });
    return (
      <main className='messages'>
        {messageContent}
      </main>
    );
  };
}
export default MessageList;