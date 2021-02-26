const {Schema, model} = require('mongoose');

const userSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        avatar: String,
        fullname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        confirmed: Boolean,
        confirm_hash: String,
        last_seen: Date
    }, {timestamps: true}
);

module.exports = model('User', userSchema);
