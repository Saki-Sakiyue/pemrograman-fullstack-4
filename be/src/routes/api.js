const express = require('express');

const { verifyToken } = require('../middleware/authMiddleware');
const TemplateController = require('../controllers/TemplateController');
const AuthController = require('../controllers/AuthController');
const ReportController = require('../controllers/ReportController');
const ProfileController = require('../controllers/ProfileController');
const { uploadAvatar } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Auth routes
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/logout', AuthController.logout);

// Template routes
router.get('/api/templates', TemplateController.index);
router.get('/api/templates/:id', TemplateController.show);
router.post('/api/templates', verifyToken, TemplateController.create); // Ganti dari post ke create
router.put('/api/templates/:id', verifyToken, TemplateController.update);
router.delete('/api/templates/:id', verifyToken, TemplateController.destroy); // Ganti dari delete ke destroy
// Custom Actions (Interactions)
router.patch('/api/templates/:id/download', verifyToken, TemplateController.download);
router.post('/api/templates/:id/upvote', verifyToken, TemplateController.upvote);
router.post('/api/templates/:id/bookmark', verifyToken, TemplateController.bookmark);

router.post('/api/reports', verifyToken, ReportController.post);

// Profile route
router.get('/api/profile', verifyToken, ProfileController.getProfile);
router.patch(
  '/api/profile',
  verifyToken,
  uploadAvatar.single('avatar'),
  ProfileController.updateProfile
);

// TODO: CRUD Categories
// TODO: CRUD Comments
// TODO: CRUD Users (Admin Only)
// TODO: CRUD Stacks
// TODO: CRUD Tags

module.exports = router;
