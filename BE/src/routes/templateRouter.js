const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { 
    getActiveTemplates, 
    createTemplate 
} = require('../controllers/TemplateController');

router.get('/', getActiveTemplates);
router.post('/', verifyToken, createTemplate);
// router.put('/templates/:id', TemplateController.update);
// router.delete('/templates/:id', TemplateController.destroy);

module.exports = router;