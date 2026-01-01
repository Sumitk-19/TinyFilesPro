// For future file cleanup if saving to disk; not used with memory storage
const fs = require("fs").promises;

async function removeFile(path) {
  try {
    await fs.unlink(path);
  } catch (err) {
    // ignore
  }
}

module.exports = { removeFile };
