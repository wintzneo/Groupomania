const express = require("express");
const router = express.Router();

const post = require('../controllers/post.control');

//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

const likePost = require('./like.routes')

//router.post('/', auth, post.ANALYSE);
router.post('/', multer, post.create);

router.get('/',  post.list);
router.get('/:id',  post.OnePost);

router.delete('/:id', post.delete);

router.use('/:postId/like', likePost);

module.exports = router;