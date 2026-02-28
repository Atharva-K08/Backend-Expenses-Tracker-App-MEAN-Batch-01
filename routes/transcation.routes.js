const express = require("express");
const {
  getTransactionController,
  createTransactionController,
  getTransactionsByUserController,
  updateTransactionController,
  deleteTransactionController,
} = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/",authMiddleware, createTransactionController);
router.get("/:id", getTransactionController);
router.get("/user/:userId", getTransactionsByUserController);
router.put("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);

module.exports = router;
