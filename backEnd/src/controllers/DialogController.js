const DialogModel = require('../models/Dialog');

class DialogController {

    getAllDialogs(req, res) {
        const authorId = req.params.id
        DialogModel.find({ author: authorId})
            .populate(['author', 'partner'])
            .exec((err, dialogs) => {
                if (err) {
                    console.log(err.message)
                    return res.status(404).json('Dialogs is empty');
                }
                res.json(dialogs)
            })
    }

    createDialog(req, res) {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        }
        const dialog = new DialogModel(postData)
        dialog.save(() => {
            console.log("Сохранен объект", dialog);
        })
        return res.send()
    }

    deleteDialog(req, res) {
        const id = req.params.id
        DialogModel.findOneAndRemove({_id: id}).then((dialog) => {
            if (!dialog) {
                res.status(404).json('User not found');
            }
            res.json(`${dialog} removed`)
        }).catch(err => {
            res.status(404).json(err.message);
        })
    }
}

module.exports = DialogController;