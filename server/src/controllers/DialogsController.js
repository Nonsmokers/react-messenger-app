const DialogModel = require('../models/Dialog');
const MessageModel = require('../models/Message');

class DialogsController {

    constructor(io) {
        this.io = io
    }

    getAllDialogs = async (req, res) => {
        const authorId = req.user._id
        DialogModel.find()
            .or([{author: authorId}, {partner: authorId}])
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

            DialogModel.findOne(
                {
                    author: req.user._id,
                    partner: req.body.partner
                },
                async (err, dialog) => {
                    if (err) {
                        return res.status(500).json({
                            status: 'error',
                            message: err,
                        });
                    }
                    if (dialog) {
                        return res.status(403).json({
                            status: 'error',
                            message: 'Такой диалог уже есть',
                        });
                    } else {
                        const dialog = new DialogModel(postData)
                        const dialogObj = await dialog.save()
                        try {
                            console.log(dialogObj)
                            const message = new MessageModel({
                                text: req.body.text,
                                sender: req.user._id,
                                dialog: dialogObj._id,
                            });
                            console.log(message)
                            message.save().then(() => {
                                dialogObj.last_message = message._id;
                                dialogObj.save().then(() => {
                                    res.json(dialogObj);
                                    this.io.emit('SERVER:DIALOG_CREATED', {
                                        ...postData,
                                        dialog: dialogObj,
                                    });
                                });
                            })
                                .catch((reason) => {
                                    console.log('в псоледнем блоке 1111')
                                    res.json(reason);
                                });

                        } catch (e) {
                            console.log('в псоледнем блоке 2222222')
                            res.json({
                                status: 'error',
                                message: err,
                            });
                        }

                    }
                },
            );

        }

/*    createDialog = async (req, res) => {
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

        await DialogModel.findOneAndUpdate(
            {
                author: req.user._id,
                partner: req.body.partner
            },
            {last_message: firstMessageObj._id},
            {useFindAndModify: true},
            (err, dialog) => {
                if (err) {
                    return res.status(500).json(err.message);
                }
            })

        try {
            res.json(dialogObj);
            this.io.emit("SERVER:DIALOG_CREATED", {
                ...postData,
                dialog: dialogObj
            });
        } catch (err) {
            console.log(err)
        }
    };*/

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