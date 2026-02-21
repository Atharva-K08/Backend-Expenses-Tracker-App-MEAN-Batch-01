const { body } = require("express-validator");
const {
  forgotPassword,
  resetPassword,
  createUserController,
} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

// ==================== FORGET PASSWORD ROUTES ====================

// Route 0: Request to create user
router.post(
  "/",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("name").notEmpty().withMessage("Name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  createUserController,
);
// Route 1: Request password reset - user submits email
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Please enter a valid email")],
  forgotPassword,
);

// Route 2: Verify reset token and reset password
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  resetPassword,
);

module.exports = router;