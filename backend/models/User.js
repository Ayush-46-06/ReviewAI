const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  companyName: String,
  googleId: String,

  plan: {
    type: String,
    default: "free"
  },

  subscriptionExpires: Date
});

module.exports = mongoose.model("User", userSchema);