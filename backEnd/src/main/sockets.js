const {Server} = require("socket.io")

const createSockets = (http) => {

    const io = new Server(http, {cors: {origin: '*'}});

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            socket.emit('123123')
        });
    })
}

module.exports = createSockets;