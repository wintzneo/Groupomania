//Package file system pour modifier le système de donnée pour la fonction delete
const fs = require('fs');

//Import du modele du post
const post = require("../models/postmodel");

//Création d'un post
exports.create = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post
      .save()
      .then((post) => {
        res.status(201).json({ post });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };
  
  //Modification d'un post
  exports.update = (req, res, next) => {
    const postObject = req.file ?
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    if (req.file) {
      Post.findOne({ _id: req.params.id })
        .then((post) => {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
              .then(() => { res.status(200).json({ message: 'Poste mise à jour!' }); })
              .catch((error) => { res.status(400).json({ error }); });
          })
        })
        .catch((error) => { res.status(500).json({ error }); });
  
    } else {
      Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Poste mise à jour!' }))
        .catch((error) => res.status(400).json({ error }));
    }
  };
  
  //Récupération de tout les postes
  exports.list = (req, res, next) => {
    Postes.find()
      .then((postes) => {
        res.status(200).json(postes);
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
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Poste supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };