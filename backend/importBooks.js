const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const booksData = require('./data/books.json');

mongoose.connect('mongodb+srv://mohpro7:x6Rtf2hyieWFMfFI@cluster0.s2xbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
})
  .then(() => {
    console.log('Connexion à MongoDB réussie !');

    Book.insertMany(booksData)
      .then(() => {
        console.log('Données importées avec succès !');
        mongoose.connection.close();
      })
      .catch(error => {
        console.error('Erreur lors de l\'importation des données :', error);
        mongoose.connection.close();
      });
  })
  .catch(error => console.error('Erreur de connexion à MongoDB :', error));
