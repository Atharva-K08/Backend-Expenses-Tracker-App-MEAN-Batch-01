const mongoose = require("mongoose");

// ==================== DATABASE CONNECTION ====================

// MongoDB Connection
const connect_DB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("MongoDB Connection Error:", err);
    });
};

module.exports = connect_DB;
