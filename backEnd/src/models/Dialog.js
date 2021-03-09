const {Schema, model} = require('mongoose');

const DialogSchema = new Schema(
    {
        partner: {
            type: String,
            ref: "User"
        },
        author: {
            type: String,
            ref: "User"
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
