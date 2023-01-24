const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');
const user = require('../controllers/userController');
// from here it will finally go to profileController
router.get('/profile', profileController.profile);

router.get('/sign-in', user.signIn);
router.get('/sign-up', user.signUp);

router.post('/create', user.create);

module.exports = router;

