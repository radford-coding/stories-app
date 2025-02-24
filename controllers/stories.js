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

router.get('/:storyID', async (req, res) => {
    const story = await Story.findById(req.params.storyID).populate('author');
    const editPrivilege = req.session.user._id == story.author._id;
    res.render('stories/show.ejs', { story, editPrivilege });
});

module.exports = router;