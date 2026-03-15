const Business = require("../models/Business");
const Usage = require("../models/Usage");
const { generateAIReviews } = require("../services/reviewService");

const generateReviews = async (req, res) => {
  const { businessId } = req.body;

  const business = await Business.findById(businessId).populate("owner");

  const user = business.owner;

  const now = new Date();

  let usage;

  // FREE PLAN → 10/month
  if (user.plan === "free") {

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    usage = await Usage.findOne({
      userId: user._id,
      date: { $gte: startOfMonth }
    });

    if (usage && usage.count >= 10) {
      return res.status(403).json({
        message: "Free plan limit reached (10 reviews/month)"
      });
    }

  }

  // PRO PLAN → 100/day (all companies combined)
  if (user.plan === "pro") {

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    usage = await Usage.findOne({
      userId: user._id,
      date: { $gte: startOfDay }
    });

    if (usage && usage.count >= 100) {
      return res.status(403).json({
        message: "Daily limit reached (100 reviews/day)"
      });
    }

  }

  // Generate reviews
  const reviews = generateAIReviews();

  if (!usage) {
    usage = new Usage({
      userId: user._id,
      count: 1
    });
  } else {
    usage.count += 1;
  }

  await usage.save();

  res.json(reviews);

};

module.exports = {
  generateReviews
}