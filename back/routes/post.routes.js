const express = require("express");
const router = express.Router();
const post = require('../controllers/postcontrol');

//Import du middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');
//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

//router.post('/', auth, post.ANALYSE);
router.put('/:id', auth, multer, post.update)
router.delete('/:id', auth, post.delete);

router.post('/', auth, multer, post.create);
router.get('/', auth, post.list);
router.get('/:id', auth, post.OnePost);

module.exports = router;