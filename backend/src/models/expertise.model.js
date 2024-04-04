const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  niveis: [{
    nome: String,
    pontuacao: Number
  }]
});

const Expertise = mongoose.model('Expertise', expertiseSchema);

module.exports = Expertise;
