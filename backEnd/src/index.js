const express = require('express');
const dotenv = require("dotenv");
dotenv.config()
const {createServer} = require("http");
const PORT = process.env.PORT || 3001;
const createRoutes = require("./core/routes");
const createSockets = require("./core/sockets");


require("./core/connectDb");

const app = express();
const http = createServer(app);
const io = createSockets(http)

createRoutes(app, io)

http.listen(PORT, () => {
    console.log(`Server: http://localhost:${process.env.PORT}`)
})