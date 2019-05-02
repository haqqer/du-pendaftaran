const passport = require('passport')

exports.failLogin = (req, res) => {
    res.json({message: req.flash('info')[0]});
}

exports.login = (req, res) => {  
    res.json({message: req.flash('info')[0]})
}

exports.logout = (req, res) => {
    req.logout();
    res.send({message: 'Logout!'});
}
