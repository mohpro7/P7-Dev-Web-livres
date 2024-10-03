const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(cors());

app.use(express.json());

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

mongoose.connect(process.env.MONGO_URI, {
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
