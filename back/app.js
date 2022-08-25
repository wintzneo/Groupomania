const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require('cors')

//Import des routes
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

//Connection à la base de donnée MongoDB
mongoose
  .connect(
    "mongodb+srv://wintzneo:pm40334033@cluster0.clqmrrp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
//Header pour contourner erreurs de CORS
app.use(cors())

//Rendre la requete exploitable
app.use(bodyParser.json());

//Routes attendues
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

//Gestion de la ressource image de façon statique
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;