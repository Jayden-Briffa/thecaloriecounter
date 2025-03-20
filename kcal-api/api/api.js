const express = require('express');
const apiRouter = express.Router();

const errorhandler = require('errorhandler');
const path = require('path');

const kcalRouter = require(path.join(__dirname, 'kcalRouter'));
const foodRouter = require(path.join(__dirname, 'foodRouter'));
const consumedRouter = require(path.join(__dirname, 'consumedRouter'));

apiRouter.use(errorhandler());
apiRouter.use('/foods', foodRouter);
apiRouter.use('/consumed', consumedRouter);
apiRouter.use('/kcal', kcalRouter);

module.exports = apiRouter;