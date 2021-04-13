const MessageModel = require('../models/Message');
const DialogModel = require('../models/Dialog');

class MessagesController {

    constructor(io) {
        this.io = io
    }

    updateReadedStatus = (res, userId, dialogId) => {
        MessageModel.updateMany(
            {dialog: dialogId, partner: {$ne: userId}},
            {$set: {unread: false}},
            (err) => {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: err,
                    });
                }
                this.io.emit('SERVER:MESSAGES_READED', {
                    userId,
                    dialogId,
                });
            },
        );
    };

    getAllMessages = async (req, res) => {
        const dialogId = req.query.dialog;
        const userId = req.user._id;

        this.updateReadedStatus(res, userId, dialogId);

        MessageModel
            .find({dialog: dialogId})
            .populate(['dialog', 'sender', 'attachments'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json(err.message);
                }
                res.json(messages)
            })
    };

    createMessage = async (req, res) => {
        const userId = req.user._id;
        console.log(req.body)

        const postData = {
            text: req.body.text.text,
            dialog: req.body.text.dialogId,
            attachments: req.body.text.attachments,
            sender: userId,
        }
        this.updateReadedStatus(postData);

        const message = new MessageModel(postData)
        await message.save()
        try {
            message.populate("dialog sender attachments", (err, messageObj) => {
                if (err) {
                    res.status.json(err.message)
                }

                DialogModel.findOneAndUpdate(
                    {_id: postData.dialog},
                    {last_message: message._id},
                    {findAndModify: true, upsert: true},
                    (err) => {
                        if (err) {
                            return res.status(500).json(err.message);
                        }
                    })

                res.json(messageObj)

                this.io.emit("SERVER:NEW_MESSAGE", messageObj)
            })
        } catch (e) {
            return res.status(500).json(e.message);
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