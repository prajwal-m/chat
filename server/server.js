const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = 4000;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on("connection", socket => {
    console.log("New client connected");

    socket.on("addUser", name => {
        socket.username = name;
        console.log(socket.username);
        console.log(socket.id);
    })

    socket.on("chat message", (msg, username) => {
        console.log(msg);
        console.log(username)
        io.emit("chat message", msg, username);
    });
    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));