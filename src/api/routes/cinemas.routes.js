const express = require("express");
const {
  getAllCinemas,
  createCinema,
  deleteCinema,
  addMovie,
} = require("../controllers/cinemas.controllers");
const router = express.Router();

router.get("/", getAllCinemas);

router.post("/create", createCinema);

router.delete("/delete/:id", deleteCinema);

router.put("/edit/:id", addMovie);

module.exports = router;
