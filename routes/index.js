const express = require('express');
const router = express.Router();

// Subrouters;
const moviesRouter = require('./movies');
const usersRouter = require('./users');

// Mount our subrouters to assemble our apiRouter;
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

// Export our apiRouter, so that it can be used by our main app in server.js;
module.exports = router;
