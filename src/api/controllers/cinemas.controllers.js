const Cinema = require("../models/cinemas.models");
const Movie = require('../models/movies.model');

const getAllCinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate("movies");
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
};

const createCinema = async (req, res, next) => {
  try {
    const { name, location, } = req.body;

    const newCinema = new Cinema({
      name: name,
      location: location,
      movies: [],
    });

    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
};

const deleteCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinemaDeleted = await Cinema.findByIdAndDelete(id);
    return res.status(200).json(cinemaDeleted);
  } catch (error) {
    return next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { movies } = req.body;

    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { $push: { movies: { $each: movies } } },
      { new: true }
    );

    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCinemas,
  createCinema,
  deleteCinema,
  addMovie,
};

module.exports = {
  getAllCinemas,
  createCinema,
  deleteCinema,
  addMovie,
};
