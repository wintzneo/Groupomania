const express = require('express');
const router = express.Router();

const likes = require('../controllers/likecontrol');
const auth = require('../middleware/auth')

router.post('/:id/like', auth, likes.likePost);

module.exports = router;