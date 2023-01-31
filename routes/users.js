const express = require('express');
const passport = require('passport');
const router = express.Router();

const profileController = require('../controllers/profile');
const user = require('../controllers/userController');
// from here it will finally go to profileController
// we are putting passport.checkAuthentication to check the authentication of the user 
router.get('/profile', passport.checkAuthentication, profileController.profile);
router.get('/sign-in', user.signIn);
router.get('/sign-up', user.signUp);
router.get('/sign-out', user.destroySession);

router.post('/create', user.create); 

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), user.createSession);


module.exports = router;

