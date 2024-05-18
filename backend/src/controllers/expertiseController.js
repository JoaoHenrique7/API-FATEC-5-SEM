const Expertise = require('../models/expertise.model');

module.exports = {

  // Rota para criar um expertise
  createExpertise: async (req, res) => {
    try {
      // data atual do brasil
      const now = new Date();
      const brazilOffset = -3;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const DateTime = new Date(utcTime + 3600000 * brazilOffset);
      const newExpertise = new Expertise({
        name: req.body.name,
        createAt: DateTime
        // description: req.body.description,
      });
      await newExpertise.save();
      res.status(201).json(newExpertise);
      console.log(newExpertise)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os expertises
  getAllExpertises: async (req, res) => {
    try {
      const expertises = await Expertise.find();
      res.json(expertises);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único expertise
  getExpertiseById: async (req, res) => {
    try {
      const expertise = await Expertise.findById(req.params.id);
      if (expertise == null) {
        return res.status(404).json({ message: 'Expertise not found' });
      }
      res.json(expertise);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para atualizar um expertise
  updateExpertise: async (req, res) => {
    try {
      const expertise = await Expertise.findById(req.params.id);
      if (expertise == null) {
        return res.status(404).json({ message: 'Expertise not found' });
      }
      if (req.body.nome != null) {
        expertise.nome = req.body.nome;
      }
      await expertise.save();
      res.json(expertise);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para excluir um expertise
  deleteExpertise: async (req, res) => {
    try {
      const expertise = await Expertise.findById(req.params.id);
      if (expertise == null) {
        return res.status(404).json({ message: 'Expertise not found' });
      }
      await expertise.remove();
      res.json({ message: 'Expertise deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

}

