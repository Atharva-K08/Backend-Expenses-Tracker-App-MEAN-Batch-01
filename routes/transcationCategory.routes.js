const express = require("express");
const {
  createTranscationCategoryController,
  getTranscationCategoryController,
  getTranscationCategoriesController,
  updateTranscationCategoryController,
  deleteTranscationCategoryController,
} = require("../controllers/transcationCategory.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/",authMiddleware, createTranscationCategoryController);
router.get("/:id", getTranscationCategoryController);
router.get("/",authMiddleware, getTranscationCategoriesController);
router.put("/:id", updateTranscationCategoryController);
router.delete("/:id", deleteTranscationCategoryController);

module.exports = router;