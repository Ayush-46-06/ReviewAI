const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");

const register = async (req, res) => {

  try {

    const { name, email, password, companyName } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      companyName
    });

    res.json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


 const GetUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("GetUserProfile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

 const createOrder = async (req, res) => {

  const options = {
    amount: 9900, // ₹99 in paise
    currency: "INR",
    receipt: "revica_pro_plan"
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency
  });

};

const verifyPayment = async (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {

    // update user plan to PRO
    const user = await User.findById(req.user.id);

    user.plan = "pro";

    user.planExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.save();

    res.json({ success: true });

  } else {

    res.status(400).json({ success: false });

  }

};

module.exports = {
  register,
  login,
  GetUserProfile,
  createOrder,
  verifyPayment
};