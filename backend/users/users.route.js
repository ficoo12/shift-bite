const express = require("express");
const {
  createUser,
  getSingleUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("./users.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.route("/users").post(createUser);
router.route("/users/:id").get(getSingleUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.get("/check-auth", verifyToken, checkAuth);

module.exports = router;
