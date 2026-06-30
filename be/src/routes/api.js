const express = require('express');

const { verifyToken, verifyAdmin, optionalAuth } = require('../middleware/authMiddleware');
const TemplateController = require('../controllers/TemplateController');
const AuthController = require('../controllers/AuthController');
const ReportController = require('../controllers/ReportController');
const ProfileController = require('../controllers/ProfileController');
const CategoryController = require('../controllers/CategoryController');
const AdminUserController = require('../controllers/AdminUserController');
const AdminTemplateController = require('../controllers/AdminTemplateController');
const AdminReportController = require('../controllers/AdminReportController');
const { uploadAvatar, uploadTemplateImages } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Auth routes
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/logout', AuthController.logout);

// Category routes (public)
router.get('/api/categories', CategoryController.index);

// Template routes
router.get('/api/templates', optionalAuth, TemplateController.index);
router.get('/api/templates/:id', optionalAuth, TemplateController.show);
router.post(
  '/api/templates',
  verifyToken,
  uploadTemplateImages.array('images', 5),
  TemplateController.create
);
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
router.get('/api/profile/bookmarks', verifyToken, ProfileController.getBookmarks);
router.get('/api/profile/templates', verifyToken, ProfileController.getMyTemplates);

// Admin routes (protected with verifyToken + verifyAdmin)
router.get('/api/admin/users', verifyToken, verifyAdmin, AdminUserController.index);
router.put('/api/admin/users/:id', verifyToken, verifyAdmin, AdminUserController.updateRole);
router.delete('/api/admin/users/:id', verifyToken, verifyAdmin, AdminUserController.destroy);

router.patch('/api/admin/templates/:id/status', verifyToken, verifyAdmin, AdminTemplateController.updateStatus);

router.get('/api/admin/reports', verifyToken, verifyAdmin, AdminReportController.index);
router.patch('/api/admin/reports/:id', verifyToken, verifyAdmin, AdminReportController.updateStatus);

// TODO: CRUD Categories
// TODO: CRUD Comments
// TODO: CRUD Stacks
// TODO: CRUD Tags

module.exports = router;
