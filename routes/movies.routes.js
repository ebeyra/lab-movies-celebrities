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
    title: req.body.title,
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
      res.render("movies/movies", { allMovies: results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    // .populate("cast")
    .then((results) => {
      Celebrity.findById(results.cast).then((cast) => {
        res.render("movies/movie-details", { results, cast });
      });
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((results) => {
      console.log("Movie removed", results);
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((results) => {
      Celebrity.find().then((celebResults) => {
        res.render("movies/edit-movie", { celebResults, results });
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then((results) => {
      console.log("What's in results: ", results);
      res.redirect(`/movies/${results._id}`);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
