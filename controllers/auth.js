const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

const shortStoryData = require('../queries/short-stories.json');
const prettyData = [shortStoryData.Fantasy, shortStoryData.Mystery, shortStoryData.Horror, shortStoryData.Philosophy].flat();

const Story = require('../models/story.js');

router.get('/register', (req, res) => {
    res.render('auth/register.ejs');
});

router.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.'); //! in form?
        };
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match'); //! in form?
        };
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        req.body.userType = req.body.userType === 'on' ? 'author' : 'reader';
        const newUser = await User.create(req.body);
        await prettyData.filter(story => story.Author === newUser.alias).forEach(story => {
            Story.create({
                name: story.Name,
                body: story.content,
                owner: newUser._id,
                author: story.Author,
                vibes: story.Genre,
            });
        });
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        res.redirect('/');;
    }
});

router.post('/login', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
        };
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        if (!validPassword) {
            return res.send('Login failed. Please try again.');
        };
        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
            userType: userInDatabase.userType,
            alias: userInDatabase.alias,
        };
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;