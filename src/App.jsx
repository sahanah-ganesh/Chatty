import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [],
      users: 0
    };
  }

  serverSend = (message) => {
    this.socket.send(JSON.stringify(message));
    console.log('client to server');
  }

  addMessage = (evt) => {
    if (evt.key === 'Enter') {
      let newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: evt.target.value
      }
      console.log(newMessage);
      this.serverSend({ message: newMessage });
      evt.target.value = '';
    }
  }

  addUser = (evt) => {
    let oldUser = this.state.currentUser.name;
    console.log('oldUser', oldUser);
    if (evt.key === 'Enter') {
      console.log(evt.target.value);
      this.setState({ currentUser: { name: evt.target.value } });
      console.log(this.state, 'state');
      let users = {
        type: 'postNotification',
        newUser: evt.target.value,
        oldUser: oldUser
      };
      this.serverSend({ message: users });
      console.log('users', users);
      evt.target.value = '';
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket.onopen = (evt) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (evt) => {

      if (evt.data == parseInt(evt.data)) {
        return this.setState({ users: evt.data })
      }

      const msg = JSON.parse(evt.data);
      console.log('evtdata', evt.data);
      console.log('msg', msg);
      console.log('this.state.messages', this.state.messages);
      this.setState({messages: this.state.messages.concat(msg.message)})
    }
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <span>{this.state.users} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar addUser={this.addUser} currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
