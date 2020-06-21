const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("userLocal"), function(req, res) {
  res.json(req.user);
});

router.post("/signup", function(req, res) {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function (dbUser) {
      res.redirect(307, "/api/user-login/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

router.get("logout", function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.json({})
  });
});