const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');

const UserSchema = new Schema({
        email: {
            type: String,
            required: 'Email adress is required',
            validate: [isEmail, 'Invalid email']
        },
        avatar: String,
        fullname: {
            type: String,
            required: 'Fullname adress is required'
        },
        password: {
            type: String,
            required: 'Password adress is required'
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        confirm_hash: String,
        last_visit: {
            type: Date,
            default: new Date()
        }
    }, {timestamps: true}
);

module.exports = model('User', UserSchema);
