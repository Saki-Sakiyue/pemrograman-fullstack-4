const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/TemplateController');

router.get('/templates', TemplateController.index);
router.post('/templates', TemplateController.store);
router.put('/templates/:id', TemplateController.update);
router.delete('/templates/:id', TemplateController.destroy);

module.exports = router;