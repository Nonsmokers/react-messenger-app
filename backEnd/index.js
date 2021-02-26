const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/Schemas/User');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');

const data = require("./db.json");

mongoose.connect("mongodb+srv://Alexander:1q2w3e@cluster0.k1j8m.mongodb.net/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log(User)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/dialogs', (req, res) => {
    return res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})