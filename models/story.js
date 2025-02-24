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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vibes: {
        type: Array,
        default: [],
    },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;