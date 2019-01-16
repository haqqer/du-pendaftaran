const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/failLogin', (req, res) => {
    res.json({message: req.flash('info')[0]});
})

router.post('/login', passport.authenticate('local',{failureFlash: true, failureRedirect: '/auth/failLogin'}),  (req, res) => {
    res.json({message: "Your Login Now"})
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({message: "Logout!"})
});

module.exports = router;
