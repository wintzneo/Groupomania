const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

//Import des routes
const likeRoutes = require("./routes/likeroutes");
const postRoutes = require("./routes/postroutes");
const userRoutes = require("./routes/userroutes");

//Connection à la base de donnée MongoDB
mongoose
  .connect(
    "mongodb+srv://wintzneo:pm40334033@cluster0.clqmrrp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
//Header pour contourner erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Rendre la requete exploitable
app.use(bodyParser.json());

//Routes attendues
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoutes);

//Gestion de la ressource image de façon statique
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;