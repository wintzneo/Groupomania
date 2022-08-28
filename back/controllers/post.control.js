//Package file system pour modifier le système de donnée pour la fonction delete
const fs = require("fs");

//Import du modele du post
const Post = require("../models/post.model");

//Création d'un post
exports.create = (req, res, next) => {
  const postObject  = req.body;
  if(req.file){
      Post.create({
          ...postObject,
          imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      })
      .then(postObject => res.status(201).json("Publication créée avec succés"))
      .catch(e => res.status(500).json(e))
  }
  else if(!req.file){
      Post.create({
          ...postObject,
          imageUrl:`${req.protocol}://${req.get("host")}/images/pt.jpg`
      })
      .then(postObject => res.status(201).json("Publication créée avec succés"))
      .catch(e => res.status(500).json(e))
  }
}


//Modification d'un post
exports.update = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() => {
              res.status(200).json({ message: "Poste mise à jour!" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    Post.updateOne(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Poste mise à jour!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//Récupération de tout les postes
exports.list = (req, res, next) => {
  Post.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Récupère un poste unique par l'id
exports.OnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Supprimer un post
exports.delete = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Poste supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};


//Supprimer un post
/*exports.delete = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {

        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Poste supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    }
;*/

//Liker un post
exports.likePost = (req, res, next) => {
  switch (req.body.like) {
    //Annuler = 0
    //vérifier si l'utilisateur a liké ou dislike le post
    //Mettre à jour le post avec un message/erreur
    case 0:
      Post.findOne({ _id: req.params.id })
        .then((post) => {
          if (post.usersLiked.find((user) => user === req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
          if (post.usersDisliked.find((user) => user === req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;
    //likes = 1
    //Mettre à jour le post avec un message/erreur
    case 1:
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res.status(201).json({ message: "Ton like a été pris en compte!" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    //likes = -1
    //Mettre à jour le post avec un message/erreur
    case -1:
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: "Ton dislike a été pris en compte!" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    default:
      console.error("not today : mauvaise requête");
  }
};
