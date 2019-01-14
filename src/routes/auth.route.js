const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({message: 'Is Authenticated'})
})

router.get('/logout', (req, res) => {
    req.logout();
    res.send({message: "Logout!"})
});

module.exports = router;
