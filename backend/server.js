const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/image", require("./routes/image.routes"));
app.use("/api/pdf", require("./routes/pdf.routes"));
app.use("/api/history", require("./routes/history.routes"));

// Simple test endpoint
app.get("/api/test", (req, res) => res.json({ message: "Backend connected" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
