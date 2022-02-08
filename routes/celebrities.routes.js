const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then((results) => {
      console.log("Celebrity added", results);
      res.redirect("/celebrities/celebrities");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.render("/celebrities/create");
    });
});

router.get("/celebrities/celebrities", (req, res, next) => {
  Celebrity.find().then((results) => {
    res.render("celebrities/celebrities", { allCelebs: results });
  });
});

module.exports = router;
