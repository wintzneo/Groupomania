const express = require("express");
const router = express.Router();

const post = require('../controllers/post.control');
const auth = require('../middleware/auth')
//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');
const likePost = require('./like.routes')

//Créer/Poster
router.post('/',auth, multer, post.create);

//Lire/Récupérer
router.get('/', auth, post.allPost)
router.get('/:id', auth, post.onePost)

//Supprimer
router.delete('/:id',auth, post.delete);

//Like
router.use('/:id/like', likePost);

module.exports = router;