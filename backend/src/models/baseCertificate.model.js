const mongoose = require('mongoose');

const baseCertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  track:{
    type: String,
    required: true,
  },
  qualifiers: [],
  createAt: String
});

const baseCertificate = mongoose.model('baseCertificate', baseCertificateSchema);

module.exports = baseCertificate;
