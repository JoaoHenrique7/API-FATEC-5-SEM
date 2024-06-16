const baseCertificate = require('../models/baseCertificate.model');

module.exports = {

  // Rota para criar um baseCertificate
  createBaseCertificate: async (req, res) => {
    try {
      // data atual do brasil
      const now = new Date();
      const brazilOffset = -3;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const DateTime = new Date(utcTime + 3600000 * brazilOffset);
      const newbaseCertificate = new baseCertificate({
        name: req.body.name,
        track: req.body.track,
        qualifiers: req.body.qualifiers,
        createAt: DateTime
      });
      await newbaseCertificate.save();
      res.status(201).json(newbaseCertificate);
      console.log(newbaseCertificate)
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
      const certificate = await baseCertificate.findById(req.params.id);
      if (certificate == null) {
        return res.status(404).json({ message: 'baseCertificate not found' });
      }
      res.json(certificate);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getAllBaseCertificateByTrack: async (req, res) => {
    try {
      const { track } = req.body;

      const certificate = await baseCertificate.find({ track: track });
      if (certificate == null) {
        return res.status(404).json({ message: "baseCertificate not found" });
      }
      res.status(200).json(certificate);
    } catch (err) {
      return res.status(500).json({ peri: err.message });
    }
  },
  getCertificateByName: async (req, res) => {
    try {
      const { name } = req.body;

      const certificate = await baseCertificate.findOne({ name: name });
      if (certificate == null) {
        return res.status(404).json({ message: "baseCertificate not found" });
      }
      res.status(200).json(certificate);
    } catch (err) {
      return res.status(500).json({ peri: err.message });
    }
  },
}

