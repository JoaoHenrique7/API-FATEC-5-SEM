const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expertise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expertise',
    required: true
  },
  nivel: String,
  certificado: String
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
