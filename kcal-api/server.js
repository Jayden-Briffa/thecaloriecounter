// Import dependencies
const express = require('express');
const app = new express();
const PORT = 4001;
const morgan = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const path = require('path');

// Import routers
const pageRouter = require('./pageRouter');
const apiRouter = require('./api/api');

// Mount dependencies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(errorhandler());

// Mount endpoints
app.use('/', pageRouter); // Allows routing by slug name
app.use(express.static(path.join(__dirname, 'public'))); // Allows routing by file name
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})