const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/ProfileController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getProfile);
router.put("/update", verifyToken, updateProfile);

module.exports = router;
