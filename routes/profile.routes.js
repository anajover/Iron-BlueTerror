const router = require("express").Router();

const User = require("../models/User.model.js")

const isLoggedIn = require("../middlewares/isLoggedIn.js")

router.get("/", isLoggedIn, (req,res,next)=> {
    res.render("profile/index.hbs")
})

// GET VISTA PERFIL USUARIO

router.get("/profile", (req, res, next) => {

    //buscar datos del usuario
    User.find()
    .then((user) => {
        res.render("profile/index.hbs", {
            propfileUser: user
        })
    })
    .catch ((err)=> {
        next(err)
    })
})

module.exports = router;