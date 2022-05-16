const isAdmin = (req, res, next) => {

    if (req.session.user.admin === true) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}


module.exports = isAdmin