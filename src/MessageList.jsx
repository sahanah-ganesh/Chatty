import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log('this', this.props.messages);
    let messageContent = this.props.messages.map((message) => {
      if (message.type === 'incomingNotification') {
        return (
          <div className='notification'>
            <span className='notification-content' key={message.id} content={message.content}>{message.oldUser} changed their name to {message.newUser}</span>
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



// {
//   this.props.messages.map(message => {
//     if (message.type === 'incomingNotification') {
//       return <Notification key={message.id}
//         content={message.content} />
//     } else {
//       return <Message key={message.id}
//         chattyUsername={message.username}
//         chattyMessage={message.content} />
//     }
//   })
// }