const express = require('express');
const router = express.Router();

const Story = require('../models/story.js');

router.get('/', async (req, res) => {
    const stories = await Story.find({});
    res.render('stories/index.ejs', { stories });
});

router.get('/new', (req, res) => {
    res.render('stories/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        req.body.author = req.session.user._id;
        await Story.create(req.body);
        res.redirect('/stories');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;