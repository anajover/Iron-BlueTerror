const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie.model.js");
const User = require("../models/User.model.js");
const fileUploader = require("../middlewares/uploader.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { response } = require("express");
// const res = require("express/lib/response");


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
router.get("/movies/create", isLoggedIn, (req, res, next) => {
    res.render("movies/new-movie.hbs")
})

// // POST route for saving a new movie in the database
// router.post("/movies/create", fileUploader.single("cover"), (req, res) => {
//     const {}
// })

// POST create movie
router.post("/movies/create", isLoggedIn, fileUploader.single("cover"), (req, res, next) => {
    const { title, director, cast, plot, year} = req.body
    const ownerId = req.session.user._id
    
    MovieModel.create({
        cover: req.file.path,
        title,
        director,
        cast,
        plot,
        year,
        owner : ownerId,

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
    const {title, director, cast, plot, year} = req.body;
    const {id} = req.params;
    const ownerId = req.session.user._id;
    

    MovieModel.findByIdAndUpdate(id, {
        cover: req.file.path,
        title,
        director,
        cast,
        plot,
        year,
        owner: ownerId
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
    req.app.locals.idOfTheMovie = movieId;
    // const userLoggedId = req.session.user._id;
    // const {owner} = req.body
    MovieModel.findById(movieId).populate("owner")

       
    // const foundMovie = MovieModel.findById(movieId)
    
    // const foundUser = MovieModel.find(owner).populate("User")
    // const foundUsername = foundMovie.username
    // foundOwner = User.findById()  
    
    
    .then((movie) => {

        console.log(movie)

        const foundMovieByOwner = movie.owner._id.toString();
        console.log(foundMovieByOwner);
         
     

            if (req.app.locals.userIsActive === true) {

                const foundUserLoggedById = req.session.user._id;
                console.log(foundUserLoggedById);

            if (foundMovieByOwner === foundUserLoggedById){
                req.app.locals.editMovieCreated = true;
                console.log(req.app.locals.editMovieCreated)
            } else {
                req.app.locals.editMovieCreated = false;
                console.log(req.app.locals.editMovieCreated)
                // res.render("movies/movie-details.hbs", {
                //     ownerMessage: `Película creada por ${foundMovieByOwner.username}`,
                // })
            }
        } 
       
        
        
        
        res.render("movies/movie-details.hbs", {
            movieDetails: movie,
            // foundMovieByeOwner: movie.owner.toString(),
            // foundUserLoggedById: req.session.user._id,
            movieOwner: movie.owner

        // movie.populate("owner")
        // .then ((movieData)=>{
        //     console.log(movieData)
        // res.render("movies/movie-details.hbs", {
        //     movieOwner: movieData.owner
        // })
        // })
        // console.log(ownerName);
        
        // const foundMovieByOwner = movie.owner._id.toString();
        // console.log(foundMovieByOwner);
        // const foundUserLoggedById = req.session.user._id;
        // console.log(foundUserLoggedById);

        // if (foundMovieByOwner === foundUserLoggedById){
        //     req.app.locals.editMovieCreated = true;
        //     console.log(req.app.locals.editMovieCreated)
        // } else {
        //     req.app.locals.editMovieCreated = false;
        //     console.log(req.app.locals.editMovieCreated)
        //     // res.render("movies/movie-details.hbs", {
        //     //     ownerMessage: `Película creada por ${foundMovieByOwner.username}`,
        //     // })
            
        // }
        
        
        // res.render("movies/movie-details.hbs", {
        //     movieDetails: movie,
        //     foundMovieByeOwner: movie.owner.toString(),
        //     foundUserLoggedById: req.session.user._id,
            
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

router.get("/profile/createdByUser", (req, res, next) => {
    const id = req.session.user._id
    
    User.findById(id).populate("owner")

    .then((movie) => {
        console.log(movie)

        res.render("/profile/ownerlist.hbs", {
            movieDetails: movie,
        })
    })
})




module.exports = router;