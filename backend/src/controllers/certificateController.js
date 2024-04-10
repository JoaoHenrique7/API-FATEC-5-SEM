const Certificate = require('../models/certificate.model');

module.exports = {

  // Rota para criar um certificate
  createCertificate: async (req, res) => {
    try {
      const newCertificate = new Certificate({
        name: req.body.name,
        // description: req.body.description,
      });
      await newCertificate.save();
      res.status(201).json(newCertificate);
      console.log(newCertificate)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os certificates
  getAllCertificates: async (req, res) => {
    try {
      const certificates = await Certificate.find();
      res.json(certificates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único certificate
  getCertificateById: async (req, res) => {
    try {
      const certificate = await Certificate.findById(req.params.id);
      if (certificate == null) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      res.json(certificate);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para atualizar um certificate
  updateCertificate: async (req, res) => {
    try {
      const certificate = await Certificate.findById(req.params.id);
      if (certificate == null) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      if (req.body.nome != null) {
        certificate.nome = req.body.nome;
      }
      await certificate.save();
      res.json(certificate);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para excluir um certificate
  deleteCertificate: async (req, res) => {
    try {
      const certificate = await Certificate.findById(req.params.id);
      if (certificate == null) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      await certificate.remove();
      res.json({ message: 'Certificate deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

}

