const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model')


exports.login = function(passport) {
    console.log("local")
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({email: email}, (err, user, info) => {
            console.log(user)
            if(!user) {
                return done(null, false, req.flash('info', 'Incorrect Email'))
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if(!result) {
                    return done(null, false, req.flash('info', 'Incorrect Password'))
                }
                return done(null, user)
            })
            
        })
    }));
}

exports.checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(403).json({message: "Your not login"});
    }
}


