const DialogModel = require('../models/Dialog');
const MessageModel = require('../models/Message');

class DialogsController {

    constructor(io) {
        this.io = io
    }

    getAllDialogs = async (req, res) => {
        const authorId = req.user._id
        DialogModel
            .find({author: authorId})
            .populate(['author', 'partner', 'last_message', '-password'])
            .populate({
                path: 'last_message',
                populate: {
                    path: 'sender'
                }
            })
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json('Dialogs is empty');
                }
                return res.json(dialogs)
            })
    };

    createDialog = async (req, res) => {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        }
        const dialog = new DialogModel(postData)
        const dialogObj = dialog.save()

        const firstMessage = new MessageModel({
            text: req.body.text,
            user: req.body.author,
            dialog: dialogObj._id,
        })

        await firstMessage.save()
        return res.json(dialogObj)
    };

    deleteDialog = async (req, res) => {
        const id = req.params.id
        const dialog = await DialogModel.findOneAndRemove({_id: id})
        if (!dialog) {
            return res.status(404).json('User not found');
        }
        return res.json(`${dialog} removed`)
    };
}

module.exports = DialogsController;