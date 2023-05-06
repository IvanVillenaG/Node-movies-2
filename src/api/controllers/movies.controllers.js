const Movie = require("../models/movies.model");

const getAllMovies =("/movies",async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

const getIdMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const movieById = await Movie.findById(id);
    if (movieById) {
      return res.status(200).json(movieById);
    } else {
      return res.status(404).json("No movie found by this ID");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTitleMovies = async (req, res) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title });
    if (movieByTitle.length > 0) {
      return res.status(200).json(movieByTitle);
    } else {
      return res.status(404).json("No movie found by this title");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getGenreMovies = async (req, res) => {
  const { genre } = req.params;
  try {
    const movieByGenre = await Movie.find({ genre });
    if (movieByGenre.length > 0) {
      return res.status(200).json(movieByGenre);
    } else {
      return res.status(404).json("No movies found by this genre");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getYearMovies = async (req, res) => {
  const { year } = req.params;
  try {
    const movieByYear = await Movie.find({ year });
    if (movieByYear.length > 0) {
      return res.status(200).json(movieByYear);
    } else {
      return res.status(404).json("No movie found by this year");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const postMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
    });

    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDeleted = await Movie.findByIdAndDelete(id);
    return res.status(200).json(movieDeleted);
  } catch (error) {
    return next(error);
  }
};

const editMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModify = new Movie(req.body);
    movieModify._id = id;
    const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify);
    return res.status(200).json(movieUpdated);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllMovies,
  getIdMovies,
  getTitleMovies,
  getGenreMovies,
  getYearMovies,
  postMovie,
  deleteMovie,
  editMovie,
};
