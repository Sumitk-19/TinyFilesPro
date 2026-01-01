const History = require("../models/History");

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json(history);
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
