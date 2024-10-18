const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    req.auth = {
      userId,
      isAdmin: isAdmin || false
    };
	next();
} catch (error) {
    console.error('Erreur lors de la vérification du token :', error.message);
    res.status(401).json({ message: 'Not authorized' });
  }
};
