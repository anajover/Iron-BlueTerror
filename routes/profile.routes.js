const router = require("express").Router();
const User = require("../models/User.model.js");


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


router.get("/edit", async (req, res, next) => {
    

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
router.post("/edit", (req, res, next) => {
    const {image, username, email, name, birthYear, aboutMe} = req.body;
    const {id} =req.session.user._id;
    User.findByIdAndUpdate(id, {
        image: req.file.path,
        username,
        email,
        name,
        birthYear,
        aboutMe
    }) .then((profile) => {
        res.redirect("/profile")
    }) .catch((err) => {
        next(err)
    })
});









module.exports = router;
