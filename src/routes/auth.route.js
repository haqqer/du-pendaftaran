const express = require('express');
const router = express.Router();

module.exports = (passport) => {
    console.log('trigger')
    router.post('/login', passport.authenticate('local'), (req, res) => {
        res.json({message: 'Is Authenticated'})
    })
    
    router.get('/logout', (req, res) => {
        req.logout();
        res.send({message: "Logout!"})
    });
    return router;
};