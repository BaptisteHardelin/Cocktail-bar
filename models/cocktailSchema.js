const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema({
  cocktailName: String,
  alcohol: String,
  ingredient: String,
  image: String,
});

const cocktailModel = mongoose.model("cocktail", cocktailSchema);

module.exports = cocktailModel;
