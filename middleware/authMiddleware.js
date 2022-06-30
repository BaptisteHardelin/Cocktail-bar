const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = { requireAuth, checkUser };
