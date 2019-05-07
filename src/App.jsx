import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      //add new msg to list of msgs in data
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      //update tate of app component
      //calling setstate will trigger call to render in app & child components
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(evt) {
    if (evt.key === 'Enter') {
      let newID = Math.floor((Math.random() * 100) + 1);
      let newMessage = {
        id: newID,
        username: this.state.currentUser.name,
        content: evt.target.value
      }
      // console.log(newMessage);
      let messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
      evt.target.value = '';
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
