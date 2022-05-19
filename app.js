// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "Iron-BlueTerror";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;
app.use( ( req, res, next ) => {
    if (req.session.user ){
        res.locals.userIsActive = true;
    } else {
        res.locals.userIsActive = false;
    }
    next()
}) 


// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
