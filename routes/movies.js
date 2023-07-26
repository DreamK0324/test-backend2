const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// helper function so we don't need to wrap our
// handler functions in try-catch blocks;
const ash = require('express-async-handler');

/**  GET ALL MOVIES */
router.get('/', ash(async (req, res) => {
  let movies = await Movie.find();
  res.status(200).json(movies);
}));

/** GET MOVIE BY ID */
router.get('/:id', ash(async (req, res) => {
  let movie = await Movie.findById(req.params.id).populate('userId');
  res.status(200).json(movie);
}));

/** ADD NEW MOVIE */
router.post('/', ash(async (req, res) => {
  let newMovie = await Movie.create(req.body);
  res.status(200).json(newMovie);
}));

/** DELETE MOVIE */
router.delete('/:id', ash(async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(200).json("Deleted a movie!");
}));

/** EDIT MOVIE */
router.put('/:id', ash(async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  let movie = await Movie.findById(req.params.id).populate('userId');
  res.status(201).json(movie);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
