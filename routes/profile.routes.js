const router = require("express").Router();
const User = require("../models/User.model.js");


const isLoggedIn = require("../middlewares/isLoggedIn.js");
const async = require("hbs/lib/async");


// aqui van nuestras rutas privadas
router.get("/", isLoggedIn, (req, res, next) => {

     res.render("profile/index.hbs")
  
  })
  

//GET VISTA PERFIL USUARIO // 

router.get("/",(req, res, next) => {

    //buscar datos del usuario//
    User.find()
    .then((usuario) => {
    //renderizar vista//
    res.render("profile/index.hbs", {
        perfilUsuario :  usuario
    })    
    
    })
    .catch((err) => {
    next(err)

    })

})


//GET PARA EDITAR PERFIL//


router.get("/edit", async (req, res, next) => {
    

try {


    const foundUser = await User.findById(req.session.user._id)

    res.render("profile/edit.hbs", foundUser)

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









module.exports = router;

