const express = require("express");
const {
  getAllMovies,
  getIdMovies,
  getTitleMovies,
  getGenreMovies,
  getYearMovies,
  postMovie,
  deleteMovie,
  editMovie,
} = require("../controllers/movies.controllers");
const router = express.Router();

router.get("/", getAllMovies);

router.get("/id/:id", getIdMovies);

router.get("/title/:title", getTitleMovies);

router.get("/genre/:genre", getGenreMovies);

router.get("/year/:year", getYearMovies);

router.post("/create", postMovie);

router.delete("/delete/:id", deleteMovie);

router.put("/edit/:id", editMovie);

module.exports = router;
