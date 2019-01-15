const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model')

let isMatch = (password, hash) => {
    const result = bcrypt.compare(password, hash, null)
    console.log(result)
    return result;
}

exports.login = function(passport) {
    console.log("local")
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done) {
        console.log('logout')
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        // let user = User.find({email: email});
        // console.log(user)
        // return done(null, false, {message: "test"})
        User.findOne({email: email}, (err, user) => {
            console.log(user.password)
            if(!user) {
                return done(null, false, {message: 'Incorrect Email'})
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if(!result) {
                    return done(null, false, {message: "password wrong"})
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


