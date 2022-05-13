const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie.model.js");

// GET home page
router.get("/", (req, res, next) => {
    res.render("index.hbs");
});

// GET movies page
router.get("/movies", (req, res, next) => {
    res.render("movies/main.hbs")
});

// GET list of movies
router.get("/movies/list", (req, res, next) => {

    // Buscar los titulos de las pelis en mi DB
    MovieModel.find()
    .then((movie) => {
        res.render("movies/list.hbs", {
            listMovies: movie
        })  
    }).catch((err) => {
        next(err)
    })
})

// POST list of movies


module.exports = router;