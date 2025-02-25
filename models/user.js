const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'author', 'reader'],
        default: 'reader',
    },
    alias: {
        type: String,
    },
    bio: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;