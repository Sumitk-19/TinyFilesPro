const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const { mergePDF } = require("../controllers/pdf.controller");
const { compressPDF } = require("../controllers/pdf.controller");

// Allow guest merges but record history only for logged-in users (same pattern)
router.post("/merge", upload.array("pdfs", 10), async (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    try {
      const jwt = require("jsonwebtoken");
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // ignore invalid token
    }
  }
  return mergePDF(req, res, next);
});

router.post(
  "/compress",
  upload.single("pdf"),
  async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
      try {
        const jwt = require("jsonwebtoken");
        const token = header.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {}
    }
    return compressPDF(req, res, next);
  }
);

module.exports = router;
