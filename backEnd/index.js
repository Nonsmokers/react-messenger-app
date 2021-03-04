const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require("./db.json");
const app = express();
const port = 3001;
const UserController = require('./src/controllers/UserController');
const DialogController = require('./src/controllers/DialogController');

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


const mongoDB = 'mongodb+srv://Alexander:1q2w3e@cluster0.k1j8m.mongodb.net/chat'
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const {createUser, findUser, deleteUser} = new UserController();
const {getAllDialogs, createDialog} = new DialogController();

app.get('/dialogs/:id', getAllDialogs);
app.post('/dialogs', createDialog);

app.get('/user/:id', findUser);
app.post('/user/register', createUser);
app.delete('/user/:id', deleteUser);

app.get('/dialogs', (req, res) => {
    return res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})