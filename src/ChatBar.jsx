import React from 'react';

// Render chatbar with username and message input fields that trigger event on enter
function ChatBar(props) {
  return (
    <footer className='chatbar'>
      <input onKeyUp={props.addUser} className='chatbar-username' placeholder={props.currentUser.name} />
      <input onKeyUp={props.addMessage} className='chatbar-message' placeholder='Type a message and hit ENTER' />
    </footer>
  );
}
export default ChatBar;
