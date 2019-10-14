import React from "react";
import "./App.css";
import Button from "./components/button/Button";
import ChatList from "./components/chatlist/ChatList";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://172.16.7.195:4000");

class App extends React.Component {
  state = {
    endpoint: "http://localhost:4000",
    message: "",
    chatList: ["hey"]
  };
  componentDidMount = () => {
    let newList = [...this.state.chatList];
    socket.on("chat message", msg => {
      newList.push(msg);
      this.setState({ chatList: newList });
    });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendMessage = () => {
    console.log("button clicked");
    console.log(this.state.message);
    socket.emit("chat message", this.state.message);
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
