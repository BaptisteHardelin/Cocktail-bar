const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");
const upload = require("./middleware/uploadCocktail");
const cocktailModel = require("./models/cocktailSchema");

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://admin:admin@cocktail-api.cdxqy.mongodb.net/cocktail-api";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on : http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/add-cocktails", requireAuth, (req, res) => res.render("addCocktail"));
app.use(authRoute);

app.get("/see-cocktails", (req, res) => {
  res.render("cocktails");
});

app.get("/error", (req, res) => {
  res.render("errorIngredient");
});

app.post("/post", requireAuth, upload.single("image"), (req, res) => {
  console.log("req.file", req.file);
  const newCocktail = cocktailModel();
  newCocktail.cocktailName = req.body.cocktailName;
  newCocktail.alcohol = req.body.alcohol;
  newCocktail.ingredient = req.body.ingredient;
  if (req.file == undefined) {
    newCocktail.image = req.body.image;
  } else {
    newCocktail.image = req.file.filename;
  }

  newCocktail.save((err, doc) => {
    if (!err) {
      console.log("Save the new cocktail");
      res.redirect("/cocktails");
    } else {
      res.redirect("/error");
    }
  });
});

app.get("/cocktails", requireAuth, (req, res) => {
  cocktailModel.find().then((doc) => {
    res.render("cocktails", {
      item: doc,
    });
  });
});
