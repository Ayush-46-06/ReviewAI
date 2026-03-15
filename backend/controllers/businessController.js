const Business = require("../models/Business");
const User = require("../models/User");
const { generateQR } = require("../services/qrService");


exports.createBusiness = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.id;

    // Get user
    const user = await User.findById(userId);

    // Count existing businesses
    const businessCount = await Business.countDocuments({ owner: userId });

    // FREE PLAN → only 1 company
    if (user.plan === "free" && businessCount >= 1) {
      return res.status(403).json({
        message: "Free plan allows only 1 company. Upgrade to Pro to add more."
      });
    }

    // PRO PLAN → max 5 companies
    if (user.plan === "pro" && businessCount >= 5) {
      return res.status(403).json({
        message: "Pro plan allows maximum 5 companies."
      });
    }

    const business = new Business({
      ...req.body,
      owner: userId
    });

    const reviewLink = `http://localhost:5173/review/${business._id}`;

    const qr = await generateQR(reviewLink);

    business.reviewLink = reviewLink;
    business.qrCode = qr;

    await business.save();

    res.status(201).json(business);

  } catch (error) {
    console.error("Create Business Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.user.id });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // assuming auth middleware sets req.user

    // Find the business and ensure it belongs to the user
    const business = await Business.findOne({ _id: id, owner: userId });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found or you don't have permission to edit it",
      });
    }

    // Fields allowed to update
    const { category, city, services, language, tone } = req.body;

    // Update only provided fields
    if (category !== undefined) business.category = category;
    if (city !== undefined) business.city = city;
    if (services !== undefined) business.services = services;
    if (language !== undefined) business.language = language;
    if (tone !== undefined) business.tone = tone;

    await business.save();

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

