const express = require('express');
const router = express.Router();

const Story = require('../models/story.js');
const User = require('../models/user.js');

const storiesJSON = require('../queries/short-stories.json');
const bcrypt = require('bcryptjs');
const lookForAndCreateOrUpdateStories = async () => {
    const jsonstories = [storiesJSON.Fantasy, storiesJSON.Horror, storiesJSON.Mystery, storiesJSON.Philosophy].flat();
    for (const jsonstory of jsonstories) {
        try {
            // find such a story
            const foundStory = await Story.findOne({ name: jsonstory.Name, author: jsonstory.Author, });
            // if not, find the author
            if (!foundStory) {
                const foundAuthor = await User.findOne({ alias: jsonstory.Author, });
                // if we find the author, add this story to their collection
                if (foundAuthor) {
                    // add story to this author
                    const newStoryOldAuthor = await Story.create({
                        name: jsonstory.Name,
                        body: jsonstory.content,
                        owner: foundAuthor._id,
                        author: foundAuthor.alias,
                        vibes: jsonstory.Genre,
                    });
                } else {
                    // create this author
                    const newAuthor = await User.create({
                        username: jsonstory.Author.replace(/\W/g, ''),
                        password: bcrypt.hashSync('asdf', 10),
                        userType: 'author',
                        alias: jsonstory.Author,
                    });
                    // add this story to this new author
                    const newStory = await Story.create({
                        name: jsonstory.Name,
                        body: jsonstory.content,
                        owner: newAuthor._id,
                        author: newAuthor.alias,
                        vibes: jsonstory.Genre,
                    });
                };
            } else {
                if (foundStory.body !== jsonstory.content) {
                    await Story.findByIdAndUpdate(foundStory._id, { body: jsonstory.content, });
                };
            };
        } catch (error) {
            console.log(error);
        };
    };
};

router.get('/', async (req, res) => {
    // lookForAndCreateOrUpdateStories();
    const stories = await Story.find({}).populate('owner').sort('name');
    res.render('stories/index.ejs', { stories });
});

router.get('/new', (req, res) => {
    res.render('stories/new.ejs');
});

router.get('/search', async (req, res) => {
    let storyQuery = {};
    let authorQuery = {};
    let stories = [];
    let authors = [];
    if (req.query.titleSearch) {
        storyQuery = {
            name: {
                $regex: req.query.titleSearch,
                $options: 'i',
            }
        };
        authorQuery = {
            alias: {
                $regex: req.query.titleSearch,
                $options: 'i',
            }
        };
    };
    if (req.query.titleSearch) {
        stories = await Story.find(storyQuery).populate('owner').sort('name');
        authors = await User.find(authorQuery);
    };
    res.render('stories/search.ejs', { stories, authors });
});

router.post('/search', (req, res) => {
    const queryString = req.body.titleSearch ? 'titleSearch=' + req.body.titleSearch : '';
    res.redirect(`/stories/search?${queryString}`);
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        req.body.author = req.session.user.alias ? req.session.user.alias : req.session.user.username;
        await Story.create(req.body);
        res.redirect('/stories');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.get('/:storyID', async (req, res) => {
    const story = await Story.findById(req.params.storyID).populate('owner');
    const editPrivilege = req.session.user._id == story.owner._id;
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