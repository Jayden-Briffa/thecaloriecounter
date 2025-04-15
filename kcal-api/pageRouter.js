import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import errorhandler from 'errorhandler';

const pagesRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default pagesRouter;