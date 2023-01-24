const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
// const userController = require('./users');

router.get('/', homeController.home);
// from here if any request comes to localhost/user it will go to ./users
router.use('/user', require('./users'));
router.use('/post', require('./post'));

module.exports = router;