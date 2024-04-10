const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    // senha: {
    //   type: String,
    //   required: true
    // },
    // tipo: {
    //   type: String,
    //   enum: ['administrador', 'consultor'],
    //   required: true
    // },
    // nome: String,
    // tipo_documento: String,
    // documento: String,
    // expertises: [{
    //   nome: String,
    //   nivel: String,
    //   certificado: String,
    //   pontuacao: Number
    // }]
    nome: String,
    email: String,
    senha: String,
    tipo: String
  });

module.exports = mongoose.model('User', userSchema);

