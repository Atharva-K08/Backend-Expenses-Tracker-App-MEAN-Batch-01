const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connect_DB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Cookie parser middleware
app.use(cookieParser());

// Morgan logging middleware
app.use(morgan("dev"));

// Data Base Connection
connect_DB();

// ==================== HEALTH CHECK ROUTE ====================

app.use("/api/auth", require("./routes/user.routes"))
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running successfully" });
});

// ==================== ERROR HANDLING MIDDLEWARE ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message || "Something went wrong",
  });
});

// ==================== EXPORT ====================

module.exports = app;
