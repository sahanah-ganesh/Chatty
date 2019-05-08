import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log('this', this.props.messages);
    let messageContent = this.props.messages.map((message) => {
      if (message.type === 'incomingNotification') {
        return (
          <div key={message.id} className='message system'>
            <span className='notification-content' content={message.content}>{message.oldUser} changed their name to {message.newUser}</span>
          </div>
        );
      }
       return ( <Message key={message.id} username={message.username} content={message.content} /> );
    });
    return (
      <main className='messages'>
        {messageContent}
      </main>
    );
  }
}
export default MessageList;