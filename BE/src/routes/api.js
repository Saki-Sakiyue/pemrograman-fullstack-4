const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const TemplateController = require("../controllers/TemplateController");
const AuthController = require("../controllers/AuthController");
const ReportController = require("../controllers/ReportController");

const router = express.Router();

router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Auth routes
router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/register", AuthController.register);
router.post("/api/auth/logout", AuthController.logout);

// Template routes
router.get("/api/templates", TemplateController.index);
router.post("/api/templates", verifyToken, TemplateController.post);
router.patch("/api/templates/:id/download", TemplateController.download);

router.post("/api/reports", verifyToken, ReportController.post);

module.exports = router;
