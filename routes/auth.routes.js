const router = require("express").Router();

const bcryptjs = require("bcryptjs")
const UserModel = require("../models/User.model.js")

// GET view the form for SIGNUP
router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

// POST receive the user data and create it
router.post("/signup", async (req, res, next) => {
    const {username, email, password} = req.body

    //validate if the info is complete
    if (!username || !email || !password) {
        res.render("auth/signup", {
            errorMessage: "Debes rellenar todos los campos.",
        })
        return;
    }

    // validate if the password is secure
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (passwordRegex.test(password) === false) {
        res.render("auth/signup", {
            errorMessage: "Contraseña no valida. Debe tener 8 caracteres, una letra y un número."
        })
        return;
    }


    try {
        const foundUser = await UserModel.findOne({ $or: [{email: email}, {username: username}]})
        if (foundUser !== null) {
            res.render("auth/signup", {
                errorMessage: "Usuario y a registrado"
            })
            return;
        }

        //encrypt password
        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)

        // User created on DB
        const createdUser = await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.redirect("/auth/login")
    }catch(err){
        next(err)
    }
})

// GET view login form
router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

// POST validate user credentials
router.post("/login", async (req, res, next) => {
    const {email, password} = req.body

    // validate if any field is empty
    if (!email || !password) {
        res.render("auth/login", {
            errorMessage: "Debes rellenar todos los campos.",
        })
        return;
    }


    try {
        // validate if user exists on DB
        const foundUser = await UserModel.findOne({ email: email })

        if (!foundUser) {
            res.render("auth/login", {
                errorMessage: "Lo siento, el usuario no está registrado.",
            })
            return;
        }

        // User validation
        const passwordCheck = await bcryptjs.compare(password, foundUser.password)

        if (!passwordCheck) {
            res.render("auth/login", {
                errorMessage: "Contraseña incorrecta.",
            })
            return;
        }

        // Create an active session
        req.session.user = foundUser;

        req.app.locals.userIsActive = true;

        res.redirect("/profile")
    } catch(err) {
        next(err)
    }
})

// POST close the session
router.post("/logout", (req, res, next) => {

    req.session.destroy()
    req.app.locals.userIsActive = false;

    res.redirect("/")
})


module.exports = router;