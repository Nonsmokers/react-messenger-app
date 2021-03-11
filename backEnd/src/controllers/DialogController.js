const DialogModel = require('../models/Dialog');
const MessageModel = require('../models/Message');

class DialogController {

    getAllDialogs = async (req, res) => {
        const authorId = req.params.id
        DialogModel
            .find({author: authorId})
            .populate(['author', 'partner'])
            .exec((err, dialogs) => {
                if (err) {ret
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

module.exports = DialogController;