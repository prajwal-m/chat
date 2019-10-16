import React from "react";
import "./App.css";
import Button from "./components/button/Button";
import ChatList from "./components/chatlist/ChatList";
import userList from "./components/userList/UserList";
import HomePage from "./pages/landing/Landing";

import socketIOClient from "socket.io-client";
import UserList from "./components/userList/UserList";
import Landing from "./pages/landing/Landing";
const socket = socketIOClient("http://172.16.7.195:4000");

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>chat App</h1>
        <HomePage />
      </div>
    );
  }
}

export default App;
