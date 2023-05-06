const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../api/models/movies.model");
const Cinema = require("../api/models/cinemas.models");
dotenv.config();

const movies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];

const movieDocuments = movies.map((movie) => new Movie(movie));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Promise.all([Movie.deleteMany(), Cinema.deleteMany()]);

    await Movie.insertMany(movieDocuments);

    const allMovies = await Movie.find();

    const cinema1 = new Cinema({
      name: "Puerta de Alicante",
      location: "Alicante",
      movies: [allMovies[0]._id, allMovies[1]._id],
    });

    const cinema2 = new Cinema({
      name: "IMF Habaneras",
      location: "Torrevieja",
      movies: [allMovies[2]._id, allMovies[3]._id],
    });

    await Promise.all([cinema1.save(), cinema2.save()]);

    await Cinema.populate(cinema1, { path: "movies" });
    await Cinema.populate(cinema2, { path: "movies" });

    console.log("Base de datos creada");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
