const express = require('express');
const router = express.Router();
const { 
    getActiveTemplates, 
    createTemplate 
} = require('../controllers/TemplateController');

router.get('/', getActiveTemplates);
router.post('/', createTemplate);
// router.put('/templates/:id', TemplateController.update);
// router.delete('/templates/:id', TemplateController.destroy);

module.exports = router;