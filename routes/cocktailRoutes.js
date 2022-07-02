const express = require("express");
const CocktailController = require("../controllers/cockailController");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/cocktails", CocktailController.index);
router.post("/add-cocktails", CocktailController.store);
router.post(
  "/update-cocktail",
  upload.single("cocktail"),
  CocktailController.store
);
router.post("/delete-cocktail", CocktailController.destroy);

module.exports = router;
