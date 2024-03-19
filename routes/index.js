var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render("login");
});

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render("profile", { username: req.user.username }); // Pass the username to the view
});


router.post("/register", function (req, res, next) {
  let userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  userModel.register(userdata,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  });
});

// Handle user login
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed, redirect to login page with flash message
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      // Authentication successful, redirect to profile page
      return res.redirect("/profile");
    });
  })(req, res, next);
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;