const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

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
        await User.create(req.body);
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
            _id: userInDatabase._id
        };
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;