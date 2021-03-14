const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
        text: {
            type: String
        },
        dialog: {
            type: Schema.Types.ObjectId,
            ref: "Dialog"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        unread: {
            type: Boolean,
            default: true
        },
    },
    {timestamps: true}
);

module.exports = model('Message', MessageSchema);