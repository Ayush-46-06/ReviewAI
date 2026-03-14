const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected route to create business
router.post("/", authMiddleware, businessController.createBusiness);

// Protected route to get user businesses
router.get("/user", authMiddleware, businessController.getUserBusinesses);

// Public route to view business details
router.get("/:id", businessController.getBusinessById);

module.exports = router;
