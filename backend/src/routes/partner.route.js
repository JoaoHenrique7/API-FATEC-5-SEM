const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.post('/', partnerController.createPartner);
router.get('/', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.patch('/:id', partnerController.updatePartner);
router.patch('/:id/expertises', partnerController.updatePartnerExpertises);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
