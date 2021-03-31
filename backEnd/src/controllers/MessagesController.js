const MessageModel = require('../models/Message');
const DialogModel = require('../models/Dialog');

class MessagesController {

    constructor(io) {
        this.io = io
    }

    getAllMessages = async (req, res) => {
        const dialogId = req.query.dialog
        MessageModel
            .find({dialog: dialogId})
            .populate(['dialog', 'sender'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json(err.message);
                }
                res.json(messages)
            })
    };

    createMessage = async (req, res) => {
        const userId = req.user._id;

        const postData = {
            text: req.body.text,
            dialog: req.body.dialogId,
            sender: userId,
        }
        const message = new MessageModel(postData)
        await message.save()
        try{
            message.populate('dialog', (err, messageObj) => {
                if (err) {
                    res.json(err.message)
                }

                DialogModel.findOneAndUpdate(
                    {_id: postData.dialog},
                    {last_message: message._id},
                    {findAndModify: true, upsert: true},
                    (err) => {
                        if(err){
                            return res.status(500).json(err.message);
                        }
                    })

                res.json(messageObj)

                this.io.emit("SERVER:NEW_MESSAGE", messageObj)
                console.log(2)
            })            
        }catch (e) {
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