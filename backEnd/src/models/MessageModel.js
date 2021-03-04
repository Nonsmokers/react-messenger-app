const {Schema, model, mongoose} = require('mongoose');

const MessageSchema = new Schema({
        author: {
            type: new mongoose.Types._ObjectId()
        },
        partner: new mongoose.Types._ObjectId(),
        messages: {
            type: String,
        },
        dialog: {
            type: String,
        },
        unread: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
);

module.exports = model('Message', MessageSchema);
