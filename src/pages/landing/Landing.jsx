import React from "react";
import "./landing.css";
import Button from "../../components/button/Button";
import ChatList from "../../components/chatlist/ChatList";
import UserList from "../../components/userList/UserList";

import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4000");

class Landing extends React.Component {
    state = {
        endpoint: "http://localhost:4000",
        message: "",
        chatList: [],
        username: "",
        userlist: [],
        userObj: {}
    };
    componentDidMount = () => {
        const name = prompt("enter username");
        this.setState({ username: name }, () => {
            socket.emit("addUser", this.state.username);
        });
        const tempUser = [...this.state.userlist];
        tempUser.push(name);
        this.setState({ userlist: tempUser });
        let newList = [...this.state.chatList];

        socket.on("addUser",(userData) => {
            console.log(userData);
            this.setState({ userObj : userData},()=> {
                console.log(this.state.userObj);
            })
        })

        socket.on("chat message", (msg, uname) => {
            newList.push({ msg: msg, name: uname });
            this.setState({ chatList: newList });
        });
    };

    handleChange = ({ target }) => {
        this.setState({ message: target.value });
    };

    sendMessage = () => {
        console.log("button clicked");
        console.log(this.state.message);
        socket.emit("chat message", this.state.message, this.state.username);
    };

    render() {
        let ulist = Object.keys(this.state.userObj);
        console.log(ulist);
        return ( <div className = "landing" >
            <div className = "wrapper" >
            <div className = "list-user" >
            <UserList userlist = { ulist }/> </div>

            <div className = "list-message" > {
                /* {this.state.chatList.map((individualMsg, index) => (
                              <ChatList key={index} listText={individualMsg} />
                            ))} */
            } 
            <ChatList listText = { this.state.chatList }/> </div> 
            </div> 
            <div className = "form-field" >
            <input className = "message-field"
            type = "text"
            onChange = { this.handleChange }
            value = { this.state.message }
            /> <Button buttonText = "Send"
            onClick = { this.sendMessage }/> 
            </div> </div>
        );
    }
}

export default Landing;