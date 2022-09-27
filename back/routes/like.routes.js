const express = require('express')
const router = express.Router({mergeParams: true})

const likes = require('../controllers/like.control')
const auth = require('../middleware/auth')

//Créer/Poster
router.post('/', auth, likes.addLike)

//Lire/Récupérer
router.get('/', auth, likes.isLike)

//Supprimer
router.delete('/', auth, likes.deleteLike)

module.exports = router;