const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  register,
  login,
  GetUserProfile,
  VerifyPayment,
  createOrder
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, GetUserProfile);
router.post("/create-order", authMiddleware, createOrder);
router.post("/verify-payment", authMiddleware, VerifyPayment);



router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Redirect to frontend with token in query string
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);



module.exports = router;