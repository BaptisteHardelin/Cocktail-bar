const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const multer = require("multer");
const cocktailModel = require("./models/Cocktails");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// routes
app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/add-cocktail", requireAuth, (req, res) => res.render("addCocktail"));
app.get("/see-cocktails", requireAuth, (req, res) =>
  res.render("seeCocktails")
);
app.use(authRoute);

app.post("/add-cocktail", upload.single("image"), (req, res, next) => {
  const obj = {
    name: req.body.name,
    ingredientList: req.body.ingredientList,
    alcohol: req.body.alcohol,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "public/uploads/" + req.file.filename)
      ),

      contentType: "image/png",
    },
  };

  cocktailModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
});

app.get("/see-cocktails", (req, res) => {
  cocktailModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("seeCocktails", { items: items });
    }
  });
});
