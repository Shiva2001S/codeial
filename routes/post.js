const express = require('express');
const router = express.Router();

const posts = require('../controllers/postController');

router.get('/', posts.post);

module.exports = router;