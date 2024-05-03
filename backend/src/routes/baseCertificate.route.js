const express = require('express');
const router = express.Router();
const baseCertificateController = require('../controllers/baseCertificateController');

router.post('/', baseCertificateController.createBaseCertificate);
router.get('/', baseCertificateController.getAllBaseCertificates);
router.get('/:id', baseCertificateController.getBaseCertificateById);


module.exports = router;
