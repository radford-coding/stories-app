const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Story = require('../models/story.js');

router.get('/', async (req, res) => {
    const users = await User.find({}).sort('username');
    res.render('users/index.ejs', { users });
});

router.get('/:userID', async (req, res) => {
    const user = await User.findById(req.params.userID).populate('stories');
    console.log(user);
    res.render('users/show.ejs', { user });
});

module.exports = router;