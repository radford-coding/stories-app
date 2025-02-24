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

router.delete('/:storyID', async (req, res) => {
    await Story.findByIdAndDelete(req.params.storyID);
    res.redirect('/stories');
});

router.get('/:storyID/edit', async (req, res) => {
    const story = await Story.findById(req.params.storyID);
    res.render('stories/edit.ejs', { story });
});

router.put('/:storyID', async (req, res) => {
    await Story.findByIdAndUpdate(req.params.storyID, req.body);
    res.redirect(`/stories/${req.params.storyID}`);
});

module.exports = router;