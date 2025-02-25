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
    const stories = await Story.find({ author: req.params.userID });
    const sessionUser = await User.findById(req.session.user._id);
    const adminPrivilege = sessionUser.userType == 'admin';
    const me = sessionUser._id.equals(user._id);
    res.render('users/show.ejs', { user, stories, adminPrivilege, me });
});

router.delete('/:userID', async (req, res) => {
    await User.findByIdAndDelete(req.params.userID);
    res.redirect('/users');
});

module.exports = router;