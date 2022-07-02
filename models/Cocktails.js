const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    alcohol: {
      type: String,
    },
    listIngredient: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamp: true }
);

const Cocktail = new mongoose.model("cocktail", cocktailSchema);

module.exports = { Cocktail };
