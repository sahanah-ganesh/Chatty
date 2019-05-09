import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Set state with default currentUser, empty messages and user count
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [],
      users: 0,
    };
  }

  // User clicks enter in message box, create object of message, username, as postMessage
  addMessage = (evt) => {
    if (evt.key === 'Enter') {
      let newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: evt.target.value,
      };
      // Call function to send object to server
      this.serverSend({ message: newMessage });
      evt.target.value = '';
    };
  }

  // User clicks enter in name box, create object of old username, new username, as postNotification
  addUser = (evt) => {
    let oldUser = this.state.currentUser.name;
    if (evt.key === 'Enter') {
      this.setState({ currentUser: { name: evt.target.value } });
      let users = {
        type: 'postNotification',
        newUser: evt.target.value,
        oldUser: oldUser
      };
      // Call function to send object to server
      this.serverSend({ message: users });
      evt.target.value = '';
    };
  }

  // Function to send message data to server stringified
  serverSend = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  // Page loaded, then client connected to server
  componentDidMount = () => {
    this.socket.onopen = (evt) => {
    }
    // Client receives data from server and checks for number. Sets state for user count with number
    this.socket.onmessage = (evt) => {
      if (evt.data == parseInt(evt.data)) {
        return this.setState({ users: evt.data });
      }
      // Transform server data back to JSON and set state with new messages
      const msg = JSON.parse(evt.data);
      this.setState({messages: this.state.messages.concat(msg.message)});
    };
  }
  // Pass props and state to children, render page
  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <span className='navbar-counter'>Users online: {this.state.users}</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar addUser={this.addUser} currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  };
}

export default App;
