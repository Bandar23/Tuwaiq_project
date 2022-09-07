const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Users = require('../models/costumer');


passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    Users.findById(id,('email name role'),(err,user)=>{
        return done(err,user);
    });
});

passport.use('local-login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},(req,email,password,done)=>{
    Users.findOne({emali:email},(err,user)=>{
        if(err) return done(err,false);
        if(!user) return done(null,false,req.flash('error-login','Email or Password Incorrect ! '));
        if(!user.comparePassword(password)){
            return done(err,false,req.flash('error-login','Email or Password Incorrect ! '));
        }

        return done(null,user);
    });
}));
