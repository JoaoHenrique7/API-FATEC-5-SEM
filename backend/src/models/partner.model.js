const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: String,
    cpfcnpj: String,
    email: String,
    tipo: String,
    expertises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expertise'
    }]
    
});

module.exports = mongoose.model('Partner', partnerSchema);