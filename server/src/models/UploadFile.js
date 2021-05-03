const {Schema, model} = require('mongoose');

const UploadFileSchema = new Schema(    {
        filename: String,
        size: Number,
        ext: String,
        url: String,
        message: {type: Schema.Types.ObjectId, ref: "Message", require: true},
        user: {type: Schema.Types.ObjectId, ref: "User", require: true}
    },
    {
        timestamps: true
    }
);

module.exports = model('UploadFile', UploadFileSchema);