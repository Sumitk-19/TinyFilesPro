const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const upload = require("../middlewares/upload.middleware");
const {
  resizeImage,
  compressToTargetSize
} = require("../controllers/image.controller");

/**
 * Optional Auth Middleware
 * - If token exists → attach req.user
 * - If not → continue as guest
 */
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    try {
      const token = header.split(" ")[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // invalid token → ignore and continue as guest
    }
  }

  next();
};

/**
 * Resize / Crop Image
 * POST /api/image/resize
 */
router.post(
  "/resize",
  upload.single("image"),
  optionalAuth,
  resizeImage
);

/**
 * Compress Image to Target Size (KB)
 * POST /api/image/target-size
 */
router.post(
  "/target-size",
  upload.single("image"),
  optionalAuth,
  compressToTargetSize
);

module.exports = router;
