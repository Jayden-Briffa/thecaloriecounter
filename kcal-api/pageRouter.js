const express = require('express');
const pagesRouter = express.Router();

const path = require('path');
const errorhandler = require('errorhandler');

// Define page slugs in format {slugName, fileName}
const pages = {
    'home': 'index.html'
}

// Create slugs for each page in pages
Object.entries(pages).forEach(([slug, file]) => {
    pagesRouter.get(`/${slug}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', file));
    });
});

pagesRouter.use(errorhandler());

module.exports = pagesRouter;