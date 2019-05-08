import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: { name: 'Bob' },
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  serverSend(message) {
    this.socket.send(JSON.stringify(message));
    console.log('client to server');
  }

  addMessage(evt) {
    if (evt.key === 'Enter') {
      let newMessage = {
        username: this.state.currentUser.name,
        content: evt.target.value
      }
      console.log(newMessage);
      this.serverSend({ message: newMessage });
      evt.target.value = '';
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = (evt) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      console.log('evtdata', evt.data);
      console.log("msg", msg);
      this.setState({messages: this.state.messages.concat(msg.message)})
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
