const baseCertificate = require('../models/baseCertificate.model');

module.exports = {

  // Rota para criar um baseCertificate
  createBaseCertificate: async (req, res) => {
    try {
      const newbaseCertificate = new baseCertificate({
        name: req.body.name,
        track: req.body.track,
        qualifiers: req.body.qualifiers
      });
      await newbaseCertificate.save();
      res.status(201).json(newbaseCertificate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os baseCertificates
  getAllBaseCertificates: async (req, res) => {
    try {
      const baseCertificates = await baseCertificate.find();
      res.json(baseCertificates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único baseCertificate
  getBaseCertificateById: async (req, res) => {
    try {
      const baseCertificate = await baseCertificate.findById(req.params.id);
      if (baseCertificate == null) {
        return res.status(404).json({ message: 'baseCertificate not found' });
      }
      res.json(baseCertificate);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

}

