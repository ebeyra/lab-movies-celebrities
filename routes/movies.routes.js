const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((results) => {
      res.render("movies/new-movie", { results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/movies/create", (req, res, next) => {
  Movie.create({
    name: req.body.name,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then((results) => {
      console.log("Movie added", results);
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.render("/movies/create");
    });
});

router.get("/movies/movies", (req, res, next) => {
  Movie.find()
    .then((results) => {
      res.render("movies/movies", { results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
