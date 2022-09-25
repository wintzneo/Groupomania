require("dotenv").config();
const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors')

//Import des routes
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");

//Header pour contourner erreurs de CORS
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes attendues
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use('/api/profile', profileRoutes);

//Gestion de la ressource image de façon statique
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;