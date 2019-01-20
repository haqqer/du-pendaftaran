const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');


// Authentication Route
router.get('/failLogin', authController.failLogin);
router.post('/login', passport.authenticate('local',{failureFlash: true, failureRedirect: 'failLogin'}), authController.login);
router.get('/logout', authController.logout);

module.exports = router;
