const multer = require("multer");

// Using memory storage for processing with sharp/pdf-lib directly
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

module.exports = upload;
