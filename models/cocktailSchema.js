const mongoose = require("mongoose");

let validateIngredient = function (ingredient) {
  const regex = "[^A-Za-z0-9;]";
  return regex.test(ingredient);
};

const cocktailSchema = new mongoose.Schema({
  cocktailName: String,
  alcohol: String,
  ingredient: {
    type: String,
    match: /^[a-zA-Z\s]+(?:;[a-zA-Z\s]+)*$/,
  },
  image: String,
});

const cocktailModel = mongoose.model("cocktail", cocktailSchema);

module.exports = cocktailModel;
