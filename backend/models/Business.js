const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  businessName: String,
  category: String,
  city: String,
  googleReviewUrl: String,
  services: [String],
  language: [String],
  tone: String,
  
  reviewLink: String,
  qrCode: String
});

module.exports = mongoose.model("Business", businessSchema);