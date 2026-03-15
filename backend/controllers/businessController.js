const Business = require("../models/Business");
const { generateQR } = require("../services/qrService");

exports.createBusiness = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const business = new Business({
      ...req.body,
      owner: req.user.id
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


