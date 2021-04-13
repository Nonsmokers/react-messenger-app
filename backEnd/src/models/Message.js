const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
        text: {type: String},
        dialog: {type: Schema.Types.ObjectId, ref: "Dialog"},
        sender: {type: Schema.Types.ObjectId, ref: "User"},
        unread: {type: Boolean, default: true},
        attachments: [{type: Schema.Types.ObjectId, ref: "UploadFile"}],
    },
    {timestamps: true}
);

module.exports = model('Message', MessageSchema);
