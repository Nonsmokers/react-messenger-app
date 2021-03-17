const UserController = require('../controllers/UsersController');
const DialogController = require('../controllers/DialogsController');
const MessageController = require('../controllers/MessagesController');
const bodyParser = require('body-parser');
const updateLastVisit = require('../middlewares/updateLastVisit');
const checkAuthenticateToken = require('../middlewares/checkAuthenticateToken');

const routes = (app, io) => {

    const {findUser, getMe, createUser, deleteUser, loginUser} = new UserController(io);
    const {getAllDialogs, createDialog, deleteDialog} = new DialogController(io);
    const {getAllMessages, createMessage, deleteMessage} = new MessageController(io);

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
    app.use(checkAuthenticateToken)

    app.get('/user/me', getMe);
    app.get('/user/:id', findUser);
    app.post('/user/sign-up', createUser);
    app.post('/user/sign-in', loginUser);
    app.delete('/user/:id', deleteUser);

    app.get('/dialogs', getAllDialogs);
    app.post('/dialogs', createDialog);
    app.delete('/dialogs/:id', deleteDialog);

    app.get('/messages', getAllMessages);
    app.post('/messages', createMessage);
    app.delete('/messages/:id', deleteMessage);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
}

module.exports = routes;