const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
        email: String,
        avatar: String,
        fullname: String,
        password: String,
        confirmed: Boolean,
        confirm_hash: String,
        last_seen: Date
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
