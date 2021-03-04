const DialogModel = require('../models/DialogModel');

class DialogController {

    getAllDialogs(req, res) {
        const authorId = req.params.id
        DialogModel.find({author: authorId})
            .populate('dialog')
            .exec((err, dialogs) => {
                if (err) {
                    console.log(err.message)
                    return res.status(404).json('Dialogs is empty');
                }
                console.log(dialogs)
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
}

module.exports = DialogController;