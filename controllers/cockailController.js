const { Cocktail } = require("../models/Cocktails");

/**
 * Shwo the list of cocktails
 */

const index = (req, res, next) => {
  Cocktail.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Error occured...",
      });
    });
};

/**
 * Push an cocktail into the DB
 */
const store = (req, res, next) => {
  let cocktail = new Cocktail({
    name: req.body.name,
    alcohol: req.body.alcohol,
    listIngredient: req.body.listIngredient,
  });
  if (req.file) {
    cocktail.img = req.file.path;
  }

  cocktail
    .save()
    .then(() => {
      res.json({
        message: "Cocktail push to the DB",
      });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Can't push the cocktail to the DB",
      });
    });
};

/**
 * Update a cocktail
 */

const update = (req, res, next) => {
  const cocktailID = req.body.cocktailID;
  const updatedData = {
    name: req.body.name,
    alcohol: req.body.alcohol,
    listIngredient: req.body.listIngredient,
    img: req.file ? req.file.path : null,
  };

  Cocktail.findByIdAndUpdate(cocktailID, { $set: updatedData })
    .then(() => {
      res.json({ message: "Cocktail updated successfully!" });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Can't update the Cocktail...",
      });
    });
};

/**
 * Delete a cocktail
 */
const destroy = (req, res, next) => {
  const cocktailID = req.body.cocktailID;
  Cocktail.findOneAndRemove(cocktailID)
    .then(() => {
      res.json({
        message: "Cocktail was deleted!",
      });
    })
    .catch((err) => {
      req.json({
        err,
        message: "Failed to delete Cocktail...",
      });
    });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
