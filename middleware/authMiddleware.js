const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cocktails = require("../models/Cocktails");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt token exist and is verified
  if (token) {
    jwt.verify(token, "babasecret", (err, decodeToken) => {
      if (err) {
        res.redirect("/login");
        console.log(err.message);
      } else {
        console.log(decodeToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// Check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "babasecret", async (err, decodeToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodeToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// get all cocktails

const getCocktails = async (req, res, next) => {
  Cocktails.find().then((result) => {
    console.log("result!!!!!", result);
    res.send(result);
  });

  next();
};

module.exports = { requireAuth, checkUser, getCocktails };
