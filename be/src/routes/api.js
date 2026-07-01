const express = require('express');

const { verifyToken, verifyAdmin, optionalAuth } = require('../middleware/authMiddleware');
const TemplateController = require('../controllers/TemplateController');
const AuthController = require('../controllers/AuthController');
const ReportController = require('../controllers/ReportController');
const ProfileController = require('../controllers/ProfileController');
const CategoryController = require('../controllers/CategoryController');
const TagController = require('../controllers/TagController');
const StackController = require('../controllers/StackController');
const AdminUserController = require('../controllers/AdminUserController');
const AdminTemplateController = require('../controllers/AdminTemplateController');
const AdminReportController = require('../controllers/AdminReportController');
const { uploadAvatar, uploadTemplateImages } = require('../middleware/uploadMiddleware');

const router = express.Router();

// API Root
router.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// ========== AUTH ROUTES ==========
router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', AuthController.logout);

// ========== MASTER DATA ROUTES ==========
router.get('/api/categories', CategoryController.index);
router.get('/api/tags', TagController.index);
router.get('/api/stacks', StackController.index);

// ========== TEMPLATE ROUTES ==========
router.get('/api/templates', optionalAuth, TemplateController.index);
router.get('/api/templates/:id', optionalAuth, TemplateController.show);
router.post(
  '/api/templates',
  verifyToken,
  uploadTemplateImages.array('images', 5),
  TemplateController.create
);
router.put('/api/templates/:id', verifyToken, TemplateController.update);
router.delete('/api/templates/:id', verifyToken, TemplateController.destroy);

// Template Interactions
router.patch('/api/templates/:id/download', verifyToken, TemplateController.download);
router.post('/api/templates/:id/upvote', verifyToken, TemplateController.upvote);
router.post('/api/templates/:id/bookmark', verifyToken, TemplateController.bookmark);

// ========== REPORT ROUTES ==========
router.post('/api/reports', verifyToken, ReportController.post);

// ========== PROFILE ROUTES ==========
router.get('/api/profile', verifyToken, ProfileController.getProfile);
router.patch(
  '/api/profile',
  verifyToken,
  uploadAvatar.single('avatar'),
  ProfileController.updateProfile
);
router.get('/api/profile/bookmarks', verifyToken, ProfileController.getBookmarks);
router.get('/api/profile/templates', verifyToken, ProfileController.getMyTemplates);

// ========== ADMIN ROUTES ==========
// Admin - Users
router.get('/api/admin/users', verifyToken, verifyAdmin, AdminUserController.index);
router.put('/api/admin/users/:id', verifyToken, verifyAdmin, AdminUserController.updateRole);
router.delete('/api/admin/users/:id', verifyToken, verifyAdmin, AdminUserController.destroy);

// Admin - Templates
router.get('/api/admin/templates', verifyToken, verifyAdmin, AdminTemplateController.index);
router.patch(
  '/api/admin/templates/:id/status',
  verifyToken,
  verifyAdmin,
  AdminTemplateController.updateStatus
);
router.delete(
  '/api/admin/templates/:id',
  verifyToken,
  verifyAdmin,
  AdminTemplateController.softDelete
);

// Admin - Reports
router.get('/api/admin/reports', verifyToken, verifyAdmin, AdminReportController.index);
router.patch(
  '/api/admin/reports/:id',
  verifyToken,
  verifyAdmin,
  AdminReportController.updateStatus
);

module.exports = router;
