// middleware/upload.js
const multer = require('multer');

const storage = multer.memoryStorage(); // keep file in RAM buffer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ok = /^(image\/jpeg|image\/png|image\/webp|image\/gif)$/.test(file.mimetype);
    if (!ok) return cb(new Error('Only JPEG, PNG, WEBP, GIF are allowed'));
    cb(null, true);
  }
});

module.exports = upload;
