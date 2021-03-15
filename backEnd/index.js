const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require("./db.json");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const UserController = require('./src/controllers/UserController');
const DialogController = require('./src/controllers/DialogController');
const MessageController = require('./src/controllers/MessageController');
const updateLastVisit = require('./src/middlewares/updateLastVisit');
const authenticateToken = require('./src/middlewares/authenticateToken');
const authValidation = require('./src/utils/authValidation');

const app = express();
dotenv.config()

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
app.use(updateLastVisit)
app.use(authenticateToken)


const mongoDB = 'mongodb+srv://Alexander:1q2w3e@cluster0.k1j8m.mongodb.net/chat'
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const {findUser, createUser, deleteUser, login} = new UserController();
const {getAllDialogs, createDialog, deleteDialog} = new DialogController();
const {getAllMessages, createMessage, deleteMessage} = new MessageController();

app.get('/user/:id', findUser);
app.post('/user/register', createUser);
app.delete('/user/:id', deleteUser);
app.post('/user/login', authValidation, login);

app.get('/dialogs/:id', getAllDialogs);
app.post('/dialogs', createDialog);
app.delete('/dialogs/:id', deleteDialog);

app.get('/messages', getAllMessages);
app.post('/messages', createMessage);
app.delete('/messages/:id', deleteMessage);


app.get('/dialogs', (req, res) => {
    return res.send(data)
})

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${process.env.PORT}`)
})