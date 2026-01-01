const { PDFDocument } = require("pdf-lib");
const History = require("../models/History");


/**
 * Merge uploaded PDFs into one PDF.
 * Requires req.files (array) from multer.
 */
exports.mergePDF = async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ message: "No PDF files uploaded" });

    // create new merged pdf
    const mergedPdf = await PDFDocument.create();

    let originalSize = 0;
    for (const file of files) {
      originalSize += file.size;
      const pdf = await PDFDocument.load(file.buffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    if (req.user) {
      await History.create({
        userId: req.user.id,
        fileType: "pdf",
        operation: "merge",
        originalSize,
        finalSize: mergedBytes.length,
        details: { count: files.length }
      });
    }

    res.set("Content-Type", "application/pdf");
    res.send(Buffer.from(mergedBytes));
  } catch (err) {
    console.error("mergePDF error:", err);
    res.status(500).json({ message: "PDF merging failed" });
  }
};


exports.compressPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    const quality = Number(req.body.quality || 70);

    const originalSize = req.file.size;

    const pdfDoc = await PDFDocument.load(req.file.buffer, {
      updateMetadata: false,
      ignoreEncryption: true
    });

    // pdf-lib automatically optimizes object streams
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      compress: true
    });

    if (req.user) {
      await History.create({
        userId: req.user.id,
        fileType: "pdf",
        operation: "compress",
        originalSize,
        finalSize: compressedPdfBytes.length,
        details: { quality }
      });
    }

    res.set("Content-Type", "application/pdf");
    res.send(Buffer.from(compressedPdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF compression failed" });
  }
};