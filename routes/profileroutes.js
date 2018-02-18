var express = require("express");
var routes = express.Router();

var authCheck = (req,res,next)=>{
  if(!req.user)
  {
    res.redirect('/auth/loginpage');
  }
  else
  {
    next();
  }
};

routes.get('/' , authCheck , (req,res)=>{
  res.render('profilepage');
});

module.exports = routes;
