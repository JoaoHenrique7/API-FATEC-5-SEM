const express = require('express');
const router = express.Router();
const expertiseController = require('../controllers/expertiseController');

router.post('/', expertiseController.createExpertise);
router.get('/', expertiseController.getAllExpertises);
router.get('/:id', expertiseController.getExpertiseById);
router.patch('/:id', expertiseController.updateExpertise);
router.delete('/:id', expertiseController.deleteExpertise);

module.exports = router;
