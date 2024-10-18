const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


require('dotenv').config();

exports.signup = (req, res) => {
  console.log('Données reçues pour la création de l\'utilisateur:', req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        isAdmin: false
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, isAdmin: user.isAdmin },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
})
    .catch(error => res.status(500).json({ error }));
};

exports.testAdmin = (req, res) => {
  console.log(req.auth);
  
  if (req.auth.isAdmin) {
    return res.status(200).json({ message: 'Vous êtes bien connecté en tant qu\'administrateur !' });
  } else {
    return res.status(403).json({ message: 'Accès refusé, vous n\'êtes pas administrateur' });
  }
};