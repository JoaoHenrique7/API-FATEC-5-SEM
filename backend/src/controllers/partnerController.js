const Partner = require("../models/partner.model");

module.exports = {
  // Rota para criar um partner
  createPartner: async (req, res) => {
    try {
      // data atual do brasil
      const now = new Date();
      const brazilOffset = -3;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const DateTime = new Date(utcTime + 3600000 * brazilOffset);
      const newPartner = new Partner({
        name: req.body.name,
        cpfcnpj: req.body.cpfcnpj,
        email: req.body.email,
        tipo: "parceiro",
        expertises: "",
        createAt: DateTime
      });
      await newPartner.save();
      res.status(201).json(newPartner);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os partners
  getAllPartners: async (req, res) => {
    try {
      const partners = await Partner.find();
      res.json(partners);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único partner
  getPartnerById: async (req, res) => {
    try {
      const partner = await Partner.findById(req.params.id);
      if (partner == null) {
        return res.status(404).json({ message: "Partner not found" });
      }
      res.json(partner);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para atualizar um partner
  updatePartner: async (req, res) => {
    try {
      const partner = await Partner.findById(req.params.id);
      if (partner == null) {
        return res.status(404).json({ message: "Partner not found" });
      }

      const { nome, cpfcnpj, email, tipo } = req.body;

      user.nome = nome !== undefined ? nome : user.nome;
      user.email = email !== undefined ? email : user.email;
      user.cpfcnpj = cpfcnpj !== undefined ? cpfcnpj : user.cpfcnpj;
      user.tipo = tipo !== undefined ? tipo : user.tipo;

      // if (req.body.name != null) {
      //   partner.name = req.body.name;
      // }
      await partner.save();
      res.json(partner);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para excluir um partner
  deletePartner: async (req, res) => {
    try {
      const partner = await Partner.findById(req.params.id);
      if (partner == null) {
        return res.status(404).json({ message: "Partner not found" });
      }
      await partner.remove();
      res.json({ message: "Partner deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
