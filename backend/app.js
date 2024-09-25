const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/user');


const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://mohpro7:x6Rtf2hyieWFMfFI@cluster0.s2xbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => console.log('Connexion à MongoDB échouée : ', error));

app.get('/', (req, res) => {
  res.send('Bienvenue sur Mon Vieux Grimoire !');
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
