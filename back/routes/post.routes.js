const express = require("express");
const router = express.Router();

const post = require('../controllers/post.control');
const auth = require('../middleware/auth')
//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

//Créer/Poster
router.post('/',auth, multer, post.create);

//Modifer
router.put('/:id',auth,multer, post.updatePost);

//Lire/Récupérer
router.get('/', auth, post.allPost)
router.get('/:id', auth, post.onePost)

//Supprimer
router.delete('/:id',auth, post.delete);

//Like
router.post('/:id/likes', auth, post.like);

module.exports = router;