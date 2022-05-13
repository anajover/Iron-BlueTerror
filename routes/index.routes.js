const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const movieRoutes = require("./movie.routes.js");
router.use("/", movieRoutes)

module.exports = router;
