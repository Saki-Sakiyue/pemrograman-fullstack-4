const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Konfigurasi penyimpanan untuk avatar
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/avatars');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const uniqueSuffix = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, timestamp + '_' + uniqueSuffix + ext);
  },
});

// Konfigurasi penyimpanan untuk template images
const templateImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/templates');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const uniqueSuffix = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, timestamp + '_' + uniqueSuffix + ext);
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only images (jpeg, jpg, png) are allowed'), false);
};

// Multer untuk avatar (1MB limit)
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});

// Multer untuk template images (5MB limit per file, max 5 files)
const uploadTemplateImages = multer({
  storage: templateImageStorage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5, // max 5 files
  },
});

module.exports = {
  uploadAvatar,
  uploadTemplateImages,
};
