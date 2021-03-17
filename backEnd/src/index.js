const express = require('express');
const dotenv = require("dotenv");
const {createServer} = require("http");
const PORT = process.env.PORT || 3001;
const createRoutes = require("./main/routes");
const createSockets = require("./main/sockets");

require("./main/connectDb");
dotenv.config()

const app = express();
const http = createServer(app);
const io = createSockets(http)

createRoutes(app, io)

http.listen(PORT, () => {
    console.log(`Server: http://localhost:${process.env.PORT}`)
})