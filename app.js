var express = require('express');
var authRoutes = require('./routes/authroutes');
var config = require('./config/passport');
var mongoose = require('mongoose');
var keys = require('./config/keys');
var cookieSession = require("cookie-session");
var passport = require("passport");
var profileRoutes = require("./routes/profileroutes");

var app = express();

app.set('view engine' , 'ejs');

app.use(cookieSession({
  keys : [keys.cookie.key]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoDB.dbURL,()=>console.log("connect"));

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{res.render('homepage')});

app.listen(8000 , ()=> console.log("App is listening on the port 8000"));
