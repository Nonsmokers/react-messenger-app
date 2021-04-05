const DialogModel = require('../models/Dialog');
const MessageModel = require('../models/Message');

class DialogsController {

    constructor(io) {
        this.io = io
    }

    getAllDialogs = async (req, res) => {
        const authorId = req.user._id
        DialogModel.find()
            .or([{ author: authorId }, { partner: authorId }])
            .populate(['author', 'partner', '-password'])
            .populate({
                path: 'last_message',
                populate: {
                    path: 'sender'
                }
            })
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json('Sidebar is empty');
                }
                return res.json(dialogs)
            })
    };

    createDialog = async (req, res) => {
        const postData = {
            author: req.user._id,
            partner: req.body.partner
        }
        const dialog = new DialogModel(postData)
        const dialogObj = await dialog.save()
        const firstMessage = new MessageModel({
            text: req.body.text,
            sender: req.user._id,
            dialog: dialogObj._id,
        })

        const firstMessageObj = await firstMessage.save()

        DialogModel.findOneAndUpdate(
            {_id: dialogObj._id},
            {last_message: firstMessageObj._id},
            {findAndModify: true, upsert: true},
            (err) => {
                if(err){
                    return res.status(500).json(err.message);
                }
            })

        try{
            res.json(dialogObj);
            this.io.emit("SERVER:DIALOG_CREATED", {
                ...postData,
                dialog: dialogObj
            });
        }catch (err) {
            console.log(err)
        }
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