const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
        text: {
            type: String,
            required: true
        },
        dialog: {
            type: Object,
            ref: "Dialog",
            required: true
        },
        user: {
            type: Object,
            ref: "User",
            required: true
        },
        unread: {
            type: Boolean,
            default: true
        },
    },
    {timestamps: true}
);

module.exports = model('Message', MessageSchema);
