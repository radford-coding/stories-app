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

module.exports = router;