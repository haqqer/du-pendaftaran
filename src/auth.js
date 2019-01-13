const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model')

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
        User.findOne({email, password})
            .then(user => {
                if(!user) {
                    return done(null, false, {message: 'Incorrect email or password'})
                }
                return done(null, user, {message: 'Logged In successfully'})
            })
            .catch(err => done(err));
    }));
}

exports.checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(403).json({message: "Your not login"});
    }
}


