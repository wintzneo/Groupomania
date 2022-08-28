const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
   // const token = req.headers.token;//
    const decodedToken = jwt.verify(token, 'udl*VFMnxp5Crly-({');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'userID invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide !')
    });
  }
};