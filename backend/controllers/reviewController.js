const Business = require("../models/Business");
const { generateAIReviews } = require("../services/reviewService");

exports.generateReviews = async (req, res) => {

  const { stars, businessId } = req.body;

  const business = await Business.findById(businessId);

  const reviews = await generateAIReviews(stars, business);

  res.json({
    success: true,
    reviews
  });

};