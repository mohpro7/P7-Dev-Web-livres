const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    }
  ],
  averageRating: { type: Number, required: true },
  userId: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
