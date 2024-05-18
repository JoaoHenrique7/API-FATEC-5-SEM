const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: String,
    cpfcnpj: String,
    email: String,
    tipo: String,
    expertises: [],
    createAt: String
    
});

module.exports = mongoose.model('Partner', partnerSchema);