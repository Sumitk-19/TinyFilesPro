const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // ✅ ADD THIS

dotenv.config();

const app = express();

/* ================================
   CONNECT DATABASE (CRITICAL)
================================ */
connectDB();

/* ================================
   CORS CONFIGURATION
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://tiny-files-pro.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

/* ================================
   MIDDLEWARES
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   ROUTES
================================ */
app.get("/", (req, res) => {
  res.send("TinyFiles API is running");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/image", require("./routes/image.routes"));
app.use("/api/pdf", require("./routes/pdf.routes"));
app.use("/api/history", require("./routes/history.routes"));

/* ================================
   ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
