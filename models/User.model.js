const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  birthYear: {
    type: Date,
  },
  aboutMe: {
    type: String
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Movie"
  }]
});

const User = model("User", userSchema);

module.exports = User;

