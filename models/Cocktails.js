const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    alcohol: {
      type: String,
      require: true,
    },
    listIngredient: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
  },
  { timestamp: true }
);

const Cocktail = new mongoose.model("cocktail", cocktailSchema);

module.exports = { Cocktail };
