const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  }
});

const upload = multer({ storage }).single('image');

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const outputPath = path.join('images', `compressed_${req.file.filename}`);

    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 70 })
      .toFile(outputPath);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier :', err);
      } else {
        console.log('Fichier supprimé avec succès');
      }
    });
          
    req.file.path = outputPath;
    req.file.filename = `compressed_${req.file.filename}`;

    next();
  } catch (error) {
    console.error('Erreur lors de la compression de l\'image', error);
    next(error);
  }
};

module.exports = { upload, compressImage };
