const MessageModel = require('../models/Message');

class MessageController {

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
        return res.json(messageObj)
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

module.exports = MessageController;