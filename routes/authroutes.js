var express = require("express");
var passport = require("passport");
var routes = express.Router();

routes.get('/loginpage' , (req,res)=>{
   res.render('loginpage');
});

routes.get('/google' , passport.authenticate('google' , {scope : ['profile'] }));

routes.get('/google/redirect' , passport.authenticate('google'), (req,res)=>{res.redirect('/profile/')});

routes.get('/logout' , (req,res)=>{
  req.logout();
  res.redirect('/auth/loginpage');});

module.exports = routes;
