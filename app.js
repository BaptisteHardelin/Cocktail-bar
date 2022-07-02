const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");
const CocktailRoute = require("./routes/cocktailRoutes");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("uploads/", express.static("uploads"));
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
app.use(authRoute);
app.use("/api/cocktail/", CocktailRoute);
