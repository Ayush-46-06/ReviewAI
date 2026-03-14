const Business = require("../models/Business");
const { generateQR } = require("../services/qrService");

exports.createBusiness = async (req, res) => {

  const business = new Business({
    ...req.body,
    owner: req.user.id
  });

  const reviewLink =
  `http://localhost:5173/r/${business._id}`;

  const qr = await generateQR(reviewLink);

  business.reviewLink = reviewLink;
  business.qrCode = qr;

  await business.save();

  res.json(business);
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