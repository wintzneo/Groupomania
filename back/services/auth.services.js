const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt.services");
const createHttpError = require("http-errors");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

//Créer utilisateur
exports.signup = async (req, res, next) => {
  if(!emailValidator.validate(req.body.email)) {
    return res.status(401).json({message: "Veuillez entrer une adresse email valide"})
  }
  if(!passwordSchema.validate(req.body.password)) {
    return res.status(401).json({message: "Pas d'espace, longueur entre 8 et 20 caractères, minimum 1 chiffre, 1 minuscule et 1 majuscule"});
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  const { email, username } = req.body;
  let user = await prisma.user.create({
    data: {
      email,
      password: hash,
      username,
      profile: {
        create: {
          bio: "Dites-nous en plus sur vous !",
          image: "http://localhost:4200/images/",
        },
      },
    },
  });
  const token = await jwt.signAccessToken(user);
  user = {
    ...user,
    token,
  };
  delete user.password;
  return user;
};

exports.login = async (req) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw createHttpError.NotFound("User not found !");
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    throw createHttpError.Unauthorized("E-mail or password not correct");
  delete user.password;
  const token = await jwt.signAccessToken(user);
  return {
    ...user,
    token,
  };
};