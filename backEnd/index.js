const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require("./db.json");
const app = express();
const port = 3001;
const UserModel = require('./src/models/UserModel');
const UserController = require('./src/controllers/UserController');

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

const User = new UserController();

app.get('/user/:id', User.findUser);
app.post('/user/register', User.createUser);
app.delete('/user/:id', User.deleteUser);

app.post('user/registration', (req, res) => {
    const postData = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    }

    const user = new UserModel(postData)
    user.save(() => {
        console.log("Сохранен объект", user);
    })
    return res.send()
})
app.get('/dialogs', (req, res) => {
    console.log(data);
    return res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})