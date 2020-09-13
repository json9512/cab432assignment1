// Import express, logger, and helmet
const express = require('express');
const logger = require('morgan');
const helmet = require("helmet");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require('cors');
const publicIp = require('public-ip');

// Import Routes
const searchTeamRoute = require("./routes/search");
const getHotels = require('./routes/getHotels');
const getRestaurants = require('./routes/getRestaurants');

// Load environment variables
require('dotenv').config();

// Initialize host and port
var hostname = publicIp.v4();
const port = 8001;

// Instantiate express and use middleware
const app = express();
app.use(helmet());
app.use(logger('tiny'));
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(cors());

// Default route 
app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to Football Trip Planner API</h1> \
    <h3>Available Endpoints</h3> \
    <ul> \
        <li>/search</li> \
        <li>/getHotels</li> \
        <li>/getRestaurants</li> \
    </ul> \
    ');
});

// Load other endpoints
app.use('/search?', searchTeamRoute);
app.use('/getHotels?', getHotels);
app.use('/getRestaurants?', getRestaurants);

// Redirect unmatched url to home
app.get('*', (req, res) => {
    res.redirect('/');
})

// Listen on port 8001
app.listen(port, async function() {
    console.log(`Express App listening at http://${await hostname}:${port}`);
});



