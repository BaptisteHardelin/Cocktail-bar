const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema({
  name: String,
  ingredientList: String,
  alcohol: Boolean,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("cocktails", cocktailSchema);
