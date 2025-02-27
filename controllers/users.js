const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Story = require('../models/story.js');

router.get('/', async (req, res) => {
    const users = await User.find({ _id: {$ne: '67bcf246d327d1debcbf004c'}, userType: 'author' }).sort('alias');
    res.render('users/index.ejs', { users });
});

router.get('/:userID', async (req, res) => {
    const userFound = await User.findById(req.params.userID);
    const stories = await Story.find({ owner: req.params.userID }).populate('owner');
    const sessionUser = await User.findById(req.session.user._id);
    const me = sessionUser._id.equals(userFound._id);
    console.log(userFound);
    res.render('users/show.ejs', { userFound, stories, me });
});

router.delete('/:userID', async (req, res) => {
    await User.findByIdAndDelete(req.params.userID);
    res.redirect('/users');
});

router.put('/:userID', async (req, res) => {
    req.body.userType = req.body.userType === 'on' ? 'author' : 'reader';
    console.log(req.session.user);
    const updatedUser = await User.findByIdAndUpdate(req.params.userID, req.body, { new: true });
    res.redirect(`/users/${req.params.userID}`);
    console.log(`updated user: ${updatedUser}`);
});

router.get('/:userID/edit', async (req, res) => {
    res.render('users/edit.ejs');
});

module.exports = router;