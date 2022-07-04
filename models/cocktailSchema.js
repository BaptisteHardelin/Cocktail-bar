const mongoose = require("mongoose");

let validateIngredient = function (ingredient) {
  const re = /^[a-zA-Z\s]+\;[a-zA-Z\s]+$/;
  return re.test(ingredient);
};

const cocktailSchema = new mongoose.Schema({
  cocktailName: String,
  alcohol: String,
  ingredient: {
    type: String,
    validate: validateIngredient,
  },
  image: String,
});

const cocktailModel = mongoose.model("cocktail", cocktailSchema);

module.exports = cocktailModel;
