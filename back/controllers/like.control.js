//Import du modele du post
const post = require("../models/like.model");

//Aimer le post
exports.likePost = (req, res, next) => {
    switch (req.body.like) {
      //cancel = 0
      //vérifier si l'utilisateur a aimé ou détesté la publication
      //mettre à jour le message, envoyer un message ou une erreur
      case 0:
        Post.findOne({ _id: req.params.id })
          .then((post) => {
            if (post.usersLiked.find(user => user === req.body.userId)) {
              Post.updateOne({ _id: req.params.id }, {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
  
            } if (post.usersDisliked.find(user => user === req.body.userId)) {
              Post.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
          })
          .catch((error) => { res.status(404).json({ error: error }); });
        break;
      //likes = 1
      //mettre à jour le message, envoyer un message ou une erreur
      case 1:
        Post.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte!' }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
      //likes = -1
      ////mettre à jour le message, envoyer un message ou une erreur
      case -1:
        Post.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
      default:
        console.error('not today : mauvaise requête');
    }
  };