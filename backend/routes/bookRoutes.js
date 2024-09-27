const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload, compressImage } = require('../middleware/multer-config');
const bookController = require('../controllers/bookController');

router.get('/bestrating', bookController.getBestRatedBooks);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', auth, upload, compressImage, bookController.createBook);
router.put('/:id', auth, upload, compressImage, bookController.modifyBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
