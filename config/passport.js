var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var user = require("../model/usermodel");

passport.serializeUser((user,done) => {
  done(null, user.id);
});

passport.deserializeUser((id,done) => {
  user.findById(id).then((user)=>{
      done(null, user);
  });
});



passport.use(
  new GoogleStrategy({
    //options for the strategy.
    callbackURL : '/auth/google/redirect',
    clientID: keys.google.id,
    clientSecret: keys.google.secret
},(accessToken,refreshToken,profile,done) => {
        //callback and check if the user is already logged in or not , if it is do something !

      user.findOne({googleId : profile.id}).then((currentUser)=>{
        if(currentUser)
        {
          console.log('currentUser is' + currentUser);
          done(null , currentUser);
        }
      else
      {
        new user({
          userName : profile.displayName,
          googleId : profile.id
        }).save().then((newUser)=>{
           console.log(newUser);
           done(null, newUser);
    });
  }
})
})
)
