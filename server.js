const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
    res.send('ASTOUNDING NEWS BY EXPRESS, VIA NORFOLK!—The Atlantic Crossed in Three Days!—Signal Triumph of Mr. Monck Mason\'s Flying Machine!—Arrival at Sullivan\'s Island, near Charlestown, S. C., of Mr. Mason, Mr. Robert Holland, Mr. Henson, Mr. Harrison Ainsworth, and four others, in the Steering Balloon, Victoria, after a Passage of Seventy-five Hours from Land to Land! Full Particulars of the Voyage!');
});

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
  