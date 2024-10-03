const { bookSchema } = require('../data-validation/validateBook');

function validateBook(req, res, next) {
    const { error } = bookSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map(err => err.message);
      return res.status(400).json({ error: errorMessages });
    }
    next();
  }

module.exports = validateBook;