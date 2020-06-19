const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// use LocalStrategy with passport, in other words login with email and password
passport.use("userLocal", new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done) {
    db.User.findOne({
      email: email
    }).then(function(dbUser) {
      // if there is no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email"
        });
        // if there is a user with the given email
      } else {
        // check password
        dbUser.validatePassword(password)
        .then((valid) => {
          if (valid) {
            return done(null, dbUser)
          } else {
            return done(null, false, {
              message: "Incorrect password"
            })
          }
        })

      }
    })
  }
));

// serialize and deserialize the user to keep authentication state across HTTP requests
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;