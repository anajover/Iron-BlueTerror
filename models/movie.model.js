const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    cover: {
        type: String,
    },
    title: {
        type: String,
    },
    director: {
        type: String,
    }, 
    cast: [String],
    plot: {
        type: String,
    },
    year: {
        type: Number,
    },
    owner: [String],
    favorites: [String],
});

const MovieModel = model("Movie", movieSchema);

module.exports = MovieModel;