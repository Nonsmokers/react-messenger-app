const bcrypt = require("bcrypt");

const generatePasswordHash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            return err ? reject(err) : resolve(hash);
        });
    });
};

module.exports = generatePasswordHash;