const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const {differenceInMinutes, parseISO} = require('date-fns');
const generatePasswordHash = require('../utils/generatePasswordHash');

const UserSchema = new Schema({
        email: {
            type: String,
            required: 'Email address is required',
            validate: [isEmail, 'Invalid email']
        },
        fullname: {type: String, required: 'Fullname address is required'},
        password: {type: String, required: 'Password address is required'},
        confirmed: {type: Boolean, default: false},
        avatar: String,
        confirm_hash: String,
        last_visit: {
            type: Date,
            default: new Date()
        }
    }, {timestamps: true}
);

UserSchema.virtual('isOnline').get(function () {
    return differenceInMinutes(parseISO(new Date().toISOString()), this.last_visit) < 5;
});

UserSchema.set("toJSON", {
    virtuals: true,
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    const hash = await generatePasswordHash(user.password)
    try {
        user.password = String(hash);
        const verifyHash = await generatePasswordHash(user.password)
        user.confirm_hash = String(verifyHash)
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = model('User', UserSchema);
