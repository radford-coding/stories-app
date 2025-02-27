const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
    },
    vibes: [{
        type: String,
    }],
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;