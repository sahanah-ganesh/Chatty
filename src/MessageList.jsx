import React, { Component } from 'react';

import Message from './Message.jsx';

{/*needs function*/}

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}
export default MessageList;