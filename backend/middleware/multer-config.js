const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

sharp.cache(false);

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  }
});

const upload = multer({ storage }).single('image');

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const outputPath = path.join('images', `compressed_${Date.now()}.avif`);

    await sharp(req.file.path)
      .resize(800)
      .toFormat('avif', { quality: 70 })
      .toFile(outputPath);

    console.log('Conversion terminée, ajout d\'un délai avant suppression...');

      try {
        await fs.promises.unlink(req.file.path);
        console.log('Fichier original supprimé avec succès.');

        req.file.path = outputPath;
        req.file.filename = path.basename(outputPath);

        next();
      } catch (error) {
        console.error('Erreur lors de la suppression du fichier :', error);
        next(error);
      }
  } catch (error) {
    console.error('Erreur lors de la compression de l\'image', error);
    next(error);
  }
};

module.exports = { upload, compressImage };
