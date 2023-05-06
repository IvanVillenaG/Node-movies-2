const express = require("express");
const dotenv = require("dotenv");
const routerMovie = require("./src/api/routes/movies.routes");
const routerCinema = require("./src/api/routes/cinemas.routes");

dotenv.config();
const { connect } = require("./src/utils/db");

const app = express();
const PORT = process.env.PORT;

connect();
app.use(express.json());

app.use("/movies", routerMovie);
app.use("/cinemas", routerCinema);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
