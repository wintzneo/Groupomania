const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodeToken = jwt.verify(token, process.env.TOKEN);

    const userId = decodeToken.payload.id;

    if (!userId) {
      res.status(401).json({ error: 'Not Auth' });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      res.status(401).json({ error: 'Not Auth' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not Auth' });
  }
};