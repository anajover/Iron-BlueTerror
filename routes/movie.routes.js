const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie.model.js");
const UserModel = require("../models/User.model.js");
const fileUploader = require("../middlewares/uploader.js");


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

// GET create movie
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie.hbs")
})

// // POST route for saving a new movie in the database
// router.post("/movies/create", fileUploader.single("cover"), (req, res) => {
//     const {}
// })

// POST create movie
router.post("/movies/create", fileUploader.single("cover"), (req, res, next) => {
    const { title, director, cast, plot, year, owner} = req.body
    
    MovieModel.create({
        cover: req.file.path,
        title,
        director,
        cast,
        plot,
        year,
        owner
    })
    .then((movie) => {
        res.redirect("/movies/list");
        // ("/movies/:ownerId") -> Cuando tengamos la relacion entre owner y movies habrá que redireccionarlo ahi
    })
    .catch((err)=>{
        next(err)
    });
});

// GET edit movie
router.get("/movies/:id/edit", (req, res, next) =>{
    const {id} = req.params;

    MovieModel.findById(id)
    .then((movie) => {
        res.render("movies/edit-movie.hbs", {
            editMovie: movie
        })
    })
    .catch((err) => {
        next(err)
    })
});

// POST edit movie
router.post("/movies/:id/edit", fileUploader.single("cover"),(req, res, next) => {
    const {cover, title, director, cast, plot, year} = req.body;
    const {id} = req.params;

    MovieModel.findByIdAndUpdate(id, {
        cover: req.file.path,
        title,
        director,
        cast,
        plot,
        year
    })
    .then((movie) => {
        res.redirect(`/movies/${movie._id}`);
    })
    .catch((err)=> {
        next(err)
    })
})

// GET movies details
router.get("/movies/:movieId", (req, res, next) => {
    const {movieId} = req.params
    MovieModel.findById(movieId)
    .then((movie) => {
        res.render("movies/movie-details.hbs", {
            movieDetails: movie
        })
    })
    .catch((err) => {
        next(err)
    })
})

// POST borrar una pelicula
router.post("/movies/:id/delete", async (req, res, next) => {
    const {id} = req.params;

    try {
        await MovieModel.findByIdAndDelete(id);
        res.redirect("/movies/list");
    } catch (err) {
        next(err)
    }
    
    // .then((movie) => {
        
    // }).catch((err) => {
    //     next(err)
    // })
})


module.exports = router;