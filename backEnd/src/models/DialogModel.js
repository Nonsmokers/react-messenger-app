const {Schema, model} = require('mongoose');

const DialogSchema = new Schema(
    {
        partner: {
            type: String,
            ref: "User",
            required: true
        },
        author: {
            type: String,
            ref: "User",
            required: true
        },
        lastMessage: {
            type: String,
            ref: "Message"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Dialog', DialogSchema);
