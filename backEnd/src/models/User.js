const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const generatePasswordHash = require('../utils/generatePasswordHash');

const UserSchema = new Schema({
        email: {
            type: String,
            required: 'Email address is required',
            validate: [isEmail, 'Invalid email']
        },
        avatar: String,
        fullname: {
            type: String,
            required: 'Fullname address is required'
        },
        password: {
            type: String,
            required: 'Password address is required'
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


UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    const hash = await generatePasswordHash(user.password)
    try {
        user.password = String(hash);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = model('User', UserSchema);
