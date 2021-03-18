const MessageModel = require('../models/Message');

class MessagesController {

    constructor(io) {
        this.io = io
    }

    getAllMessages = async (req, res) => {
        const dialogId = req.query.dialog
        MessageModel
            .find({dialog: dialogId})
            .populate(['dialog'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json('Dialogs is empty');
                }
                res.json(messages)
            })
    };

    createMessage = async (req, res) => {
        const userId = req.user._id;

        const postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialogId
        }
        const message = new MessageModel(postData)
        const messageObj = await message.save()
        try{
            res.json(messageObj)
            this.io.emit("NEW:MESSAGE", messageObj)
        }catch (e) {
            res.json(e.message)
            console.log(e.message)
        }
    };

    deleteMessage = async (req, res) => {
        const id = req.params.id
        const message = await MessageModel.findOneAndRemove({_id: id})
        if (!message) {
            return res.status(404).json('Message not found');
        }
        return res.json(`${message} removed`)
    };
}

module.exports = MessagesController;