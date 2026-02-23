const express = require("express");
const {
  getTransactionController,
  createTransactionController,
  getTransactionsByUserController,
  updateTransactionController,
  deleteTransactionController,
} = require("../controllers/transaction.controller");
const router = express.Router();

router.post("/", createTransactionController);
router.get("/:id", getTransactionController);
router.get("/user/:userId", getTransactionsByUserController);
router.put("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);

module.exports = router;
