const MessageModel = require('../models/Message');

class MessageController {

    getAllMessages(req, res) {
        const dialogId = req.query.dialog
        MessageModel.find({dialog: dialogId})
            .populate(['dialog'])
            .exec((err, messages) => {
                if (err) {
                    console.log(err.message)
                    return res.status(404).json('Dialogs is empty');
                }
                res.json(messages)
            })
    }

    createMessage(req, res) {
        const userId = '6041297e9533ff06803e4119';

        const postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialogId
        }
        const message = new MessageModel(postData)
        message.save(() => {
            console.log("Сохранен объект", message);
        }).then((obj) => {
            res.json(obj)
        })
        return res.send()
    }

}

module.exports = MessageController;