const express = require('express');
const apiRouter = express.Router();

const errorhandler = require('errorhandler');
const path = require('path');

const foodRouter = require(path.join(__dirname, 'foodRouter'));
const consumedRouter = require(path.join(__dirname, 'consumedRouter'));

apiRouter.use(errorhandler());
apiRouter.use('/foods', foodRouter);
apiRouter.use('/consumed', consumedRouter);

module.exports = apiRouter;