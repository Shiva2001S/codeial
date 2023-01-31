const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//By this we are authenticating the user 
passport.use(new LocalStrategy({
    usernameField : "email"
}, function (email, password, done) {
    // Here first email is the email property we defined in the form and 2nd email is the email we passed in the request
    User.findOne({email : email}, function (err, user) {
        if(err){
            console.log("Error in finding the user in the passport js");
            console.log(err);
            return;
        }

        if (!user || user.password != password) {
            // Here null represent that there is no error and false represent that no user with such field is found
            done(null, false);
        }

        done(null, user);
    });
}));

// By this we are setting the user.id in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// By this er are authenticating the user 2nd time after cookies are set and we are sending the request
passport.deserializeUser(function (id, done) {
    
    User.findById(id, function (err, user) {
        if(err){
            console.log("Error in finding the user in passport js");
            return done(err);
        }

        return done(null, user);
    })
});

// This fn helps to check if the user is signed in or not ie it is present in session cookie or not
passport.checkAuthentication = function (req, res, next) {
    // If the user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user is not authenticated
    return res.redirect('/user/sign-in');
}

// In this fn we are sending the data of user to views
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains all the user's info but it is not sent to res's user so we have to do it explicitly to access the user's info
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;