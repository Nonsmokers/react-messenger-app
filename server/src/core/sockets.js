const {Server} = require("socket.io")

const createSockets = (http) => {

    const io = new Server(http, {cors: {origin: '*'}});

    io.on('connection', (socket) => {
        socket.on('NEW:MESSAGE', (msg) => {
            console.log('message: ' + msg);
        });
    })

    return io;
}

module.exports = createSockets;