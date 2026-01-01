const sharp = require("sharp");
const History = require("../models/History");

const DPI = 96;

const convertToPixels = (value, unit) => {
  if (!value) return null;
  if (unit === "cm") return Math.round((value / 2.54) * DPI);
  if (unit === "in") return Math.round(value * DPI);
  return Math.round(value);
};

exports.resizeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const {
      width,
      height,
      unit = "px",
      format = "jpg",
      quality = 80,
      cropX,
      cropY,
      cropWidth,
      cropHeight
    } = req.body;

    let image = sharp(req.file.buffer);

    // 👉 Apply crop FIRST if provided
    if (
  cropWidth &&
  cropHeight &&
  Number(cropWidth) > 0 &&
  Number(cropHeight) > 0
) {
  image = image.extract({
    left: Math.max(0, Math.round(cropX || 0)),
    top: Math.max(0, Math.round(cropY || 0)),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight)
  });
}

    const wPx = convertToPixels(width, unit);
    const hPx = convertToPixels(height, unit);

    if (wPx || hPx) {
      image = image.resize(wPx, hPx);
    }

    let outputBuffer;
    let contentType;

    if (format === "png") {
      outputBuffer = await image.png().toBuffer();
      contentType = "image/png";
    } else if (format === "webp") {
      outputBuffer = await image.webp({ quality: Number(quality) }).toBuffer();
      contentType = "image/webp";
    } else {
      outputBuffer = await image.jpeg({ quality: Number(quality) }).toBuffer();
      contentType = "image/jpeg";
    }

    if (req.user) {
      await History.create({
        userId: req.user.id,
        fileType: "image",
        operation: "crop_resize",
        originalSize: req.file.size,
        finalSize: outputBuffer.length,
        details: { width, height, unit, format, quality }
      });
    }

    res.set("Content-Type", contentType);
    res.send(outputBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image processing failed" });
  }
};

exports.compressToTargetSize = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const targetKB = Number(req.body.targetKB);
    const format = req.body.format || "jpg";

    if (!targetKB || targetKB <= 0) {
      return res.status(400).json({ message: "Invalid target size" });
    }

    const targetBytes = targetKB * 1024;
    let quality = 90;
    let outputBuffer;

    while (quality > 10) {
      let img = sharp(req.file.buffer);

      if (format === "webp") {
        outputBuffer = await img.webp({ quality }).toBuffer();
      } else {
        outputBuffer = await img.jpeg({ quality }).toBuffer();
      }

      if (outputBuffer.length <= targetBytes) break;

      quality -= 5;
    }

    if (req.user) {
      await History.create({
        userId: req.user.id,
        fileType: "image",
        operation: "target_size",
        originalSize: req.file.size,
        finalSize: outputBuffer.length,
        details: { targetKB, finalQuality: quality }
      });
    }

    res.set("Content-Type", format === "webp" ? "image/webp" : "image/jpeg");
    res.send(outputBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Compression failed" });
  }
};
