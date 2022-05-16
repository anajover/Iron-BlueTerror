const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const movieRoutes = require("./movie.routes.js");
router.use("/", movieRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const uploadRoutes = require("./upload.routes.js")
router.use("/upload", uploadRoutes)

module.exports = router;
