const express = require("express");
const router = express.Router();

const { generateReviews } = require("../controllers/reviewController");

router.post("/generate", generateReviews);

module.exports = router;