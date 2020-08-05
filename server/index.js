const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');

const io = socket(server);

const SERVER_PORT = 8080;

server.listen(SERVER_PORT, () =>
    console.log(`Server is running on port ${SERVER_PORT}`)
);

const rooms = {};

io.on('connection', (socket) => {
    socket.on('join room', (roomID) => {
        //Check to see if roomID is valid; Checks for singleton participants
        if (rooms[roomID] && !rooms[roomID].includes(socket.id)) {
            rooms[roomID].push(socket.id);
            console.log(greeting(socket.id, roomID));
        } else {
            console.log(greeting(socket.id, roomID));
            rooms[roomID] = [socket.id];
        }

        //returns the ids of those in the specified room
        socket.emit('all users', rooms[roomID]);
        console.log(rooms[roomID].length);
    });

    socket.on('offer', (payload) => {
        io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', (payload) => {
        io.to(payload.target).emit('answer', payload);
    });

    //ice-candidate
    socket.on('ice-candidate', (incoming) => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });
});

function greeting(socketID, roomID) {
    return `User ${socketID} has joined Room ${roomID}`;
}
