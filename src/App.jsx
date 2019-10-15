import React from "react";
import "./App.css";
import Button from "./components/button/Button";
import ChatList from "./components/chatlist/ChatList";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:4000");

class App extends React.Component {
  state = {
    endpoint: "http://localhost:4000",
    message: "",
    chatList: [],
    username:''
  };
  componentDidMount = () => {
    const name = prompt("enter username");
    this.setState({username:name}, ()=> {
      socket.emit("addUser",this.state.username);
    })
    let newList = [...this.state.chatList];
    socket.on("chat message", (msg,uname) => {
      newList.push({msg:msg,name:uname});
      this.setState({ chatList: newList });
    });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendMessage = () => {
    console.log("button clicked");
    console.log(this.state.message);
    socket.emit("chat message", this.state.message,this.state.username);
  };

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <div className="list-message">
          {this.state.chatList.map((individualMsg, index) => (
            <ChatList key={index} listText={individualMsg} />
          ))}
        </div>
        <div className="form-field">
          <input
            className="message-field"
            type="text"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <Button buttonText="Send" onClick={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default App;
