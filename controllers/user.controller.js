const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUser, creatUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
// ==================== EMAIL CONFIGURATION ====================

module.exports.createUserController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await findUser(req.body.email);
    if (user) {
        res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const db_res = await creatUser(req.body);
    res.status(201).json({
      message: "user created",
      success: true,
      created_user: db_res,
    });
  } catch (error) {
    next(error);
  }
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.forgotPassword = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if user exists
    let user = await findUser(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    // Generate reset token (dummy token for demonstration)
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN },
    );

    // Create reset link (dummy frontend URL)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the link below to proceed:</p>
            <p>
              <a href="${resetLink}" 
                 style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </p>
            <p>Or copy this link in your browser:</p>
            <p><code>${resetLink}</code></p>
            <p><strong>Note:</strong> This link will expire in 2 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p><small>MEAN Stack Application</small></p>
          </div>
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email Error:", error);
        return res.status(500).json({
          success: false,
          message: "Error sending email",
          error: error.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
        info: info.response,
        resetToken,
      });
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, newPassword } = req.body;
    const data = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with valid reset token
    const user = await findUser(data.email);
    
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired reset token",
        });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    // console.error("Reset Password Error:", error);
    next(error);
  }
};
