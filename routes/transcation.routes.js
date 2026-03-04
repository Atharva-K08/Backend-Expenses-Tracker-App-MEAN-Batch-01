const express = require("express");
const {
  getTransactionController,
  createTransactionController,
  getTransactionsByUserController,
  updateTransactionController,
  deleteTransactionController,
  getTranscationsSummary,
} = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/",authMiddleware, createTransactionController);
router.get("/account/summary",authMiddleware, getTranscationsSummary);
router.get("/:id", getTransactionController);
router.get("/", authMiddleware, getTransactionsByUserController);
router.put("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);

module.exports = router;
