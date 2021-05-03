const cors = require('cors')
const bodyParser = require('body-parser');
const UserController = require('../controllers/UsersController');
const DialogController = require('../controllers/DialogsController');
const MessageController = require('../controllers/MessagesController');
const updateLastVisit = require('../middlewares/updateLastVisit');
const checkAuthenticateToken = require('../middlewares/checkAuthenticateToken');
const signInValidation = require("../utils/signInValidation");
const signUpValidation = require("../utils/signUpValidation");
const UploadFileController = require("../controllers/UploadFileController");
const multer = require("../core/multer");

const routes = (app, io) => {

    const {getMe, findUser, findUsers, verify, signUpUser, signInUser, deleteUser} = new UserController(io);
    const {getAllDialogs, createDialog, deleteDialog} = new DialogController(io);
    const {getAllMessages, createMessage, deleteMessage} = new MessageController(io);
    const {createFile, deleteFile} = new UploadFileController();

    app.use(cors())
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
    app.use(checkAuthenticateToken)
    app.use(updateLastVisit)

    app.get('/user/me', getMe);
    app.get('/user/verify', verify);
    app.get('/user/search/', findUser);
    app.get("/user/find", findUsers);
    app.post('/user/sign-up', signUpValidation, signUpUser);
    app.post('/user/sign-in', signInValidation, signInUser);
    app.delete('/user/:id', deleteUser);

    app.get('/dialogs', getAllDialogs);
    app.post('/dialogs', createDialog);
    app.delete('/dialogs/:id', deleteDialog);

    app.get('/messages', getAllMessages);
    app.post('/messages', createMessage);
    app.delete('/messages/:id', deleteMessage);

    app.post('/files', multer.single("file"), createFile);
    app.delete('/files', deleteFile);
}

module.exports = routes;