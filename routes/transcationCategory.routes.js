const express = require("express");
const {
  createTranscationCategoryController,
  getTranscationCategoryController,
  getTranscationCategoriesController,
  updateTranscationCategoryController,
  deleteTranscationCategoryController,
} = require("../controllers/transcationCategory.controller");

const router = express.Router();

router.post("/", createTranscationCategoryController);
router.get("/:id", getTranscationCategoryController);
router.get("/user/:userId", getTranscationCategoriesController);
router.put("/:id", updateTranscationCategoryController);
router.delete("/:id", deleteTranscationCategoryController);

module.exports = router;