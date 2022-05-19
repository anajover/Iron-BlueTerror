const router = require("express").Router();
const User = require("../models/User.model.js");
const MovieModel = require("../models/Movie.model.js");
fileUploader = require("../middlewares/uploader.js")


const isLoggedIn = require("../middlewares/isLoggedIn.js");
const async = require("hbs/lib/async");



//GET VISTA PERFIL USUARIO // 
router.get("/", isLoggedIn, async (req, res, next) => {

    try {
        const foundUser = await User.findById(req.session.user._id);

        res.render("profile/index.hbs", {
            foundUser
        })
    } catch(err) {
        next(err)
    }

  });



//GET PARA EDITAR PERFIL//


router.get("/edit", isLoggedIn, async (req, res, next) => {
    

try {


    const foundUser = await User.findById(req.session.user._id)

    res.render("profile/edit.hbs", {
     foundUser
    })

} catch(err) {
    next(err)
}
})   
    
    // const {userId} = req.params;
    // const req.app.locals.userId = req.session
    
    // User.findOne({_id : req.session._id})
    // .then((perfil) => {
    //     res.render("profile/edit.hbs", {
    //         editPerfil : perfil
    //     })
            
   
   

// });

// POST edicion de Profile
router.post("/edit", isLoggedIn, fileUploader.single("image"),(req, res, next) => {
    console.log("Hola, esto es:" + req.file)
    const {username, email, name, city, birthYear, aboutMe} = req.body;
    const id =req.session.user._id;
    
    User.findByIdAndUpdate(id, {
        image: req.file.path,
        username,
        email,
        name,
        city,
        birthYear,
        aboutMe
    }) .then((profile) => {
        res.redirect("/profile");
    }) .catch((err) => {
        next(err)
    })
});

// POST crear añadir a favoritos
router.post("/favorites/:movieId", async (req, res, next) => {
    // const {favorites} = req.body;
        const {movieId} = req.params;
        const id = req.session.user._id;
        console.log("Esto es el ID del usuario: " + id)
        

    // const foundUser = await User.findById(id).populate("")
    // console.log("Esto es el foundUser: " + foundUser.movies._id)
    // .then((user) => {
    //     console.log(user)
    //     const foundMovieId = user.favorites._id.toString();
    //     console.log(foundMovieId)
    // })
    
    

    try {

        

        const addFavorites = await User.findByIdAndUpdate(id, { $addToSet: {favorites: movieId} })
        console.log("Esto es addFavorites: " + addFavorites)
        console.log("Esto es el moviId: " + movieId)
        if (addFavorites.nModified === 0) {
            await User.findByIdAndUpdate(id, {$pull: {favorites: movieId}})
        }

        // if (addFavorites.nModified === 0) {
        //     await User.findAndUpdate({}, {$pull: {favorites: movieId}}, {multi: true});
        // }
        // if(!favorites.includes(movieId)) {
        //     await User.findAndUpdate({}, {$pull: {favorites: movieId}}, {multi: true});
        // }

        res.render("profile/favorites.hbs");
    }
    catch(err) {
        (err)
    }
    
    
        
    })



    
module.exports = router;

