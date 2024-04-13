const User = require('../models/user.model');
const nodemailer = require("nodemailer");
require('dotenv/config')
const bcrypt = require('bcrypt');
module.exports = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: 'User not found' });
      if (senha !== user.senha) return res.status(404).json({ message: 'User not found' });

      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para criar um user
  createUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.senha, 10); // Gere um hash da senha com um salt de 10 rounds
      const newUser = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: hashedPassword, // Salve a senha hasheada no banco de dados
        tipo: req.body.tipo,
      });
      await newUser.save();
      res.status(201).json(newUser);
      console.log(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único user
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para atualizar um user

  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { nome, email, senha, tipo } = req.body;
  
      user.nome = nome !== undefined ? nome : user.nome;
      user.email = email !== undefined ? email : user.email;
      user.tipo = tipo !== undefined ? tipo : user.tipo;
  
      if (senha !== undefined) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        user.senha = hashedPassword;
      }
  
      await user.save();
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  

  // Rota para excluir um user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.remove();
      res.json({ message: 'User deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },


// Rota para mudar a senha a partir do email
  updatePasswordByEmail: async (req, res) => {
    try {
      const { emailReq, newPassword } = req.body;

      if (!emailReq || !newPassword) {
        return res.status(400).json({ message: "Email and newPassword are required." });
      }
      const user = await User.findOne({ email: emailReq });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.senha = hashedPassword;

      await user.save();

      res.json({ message: "Password updated successfully." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  
  findByEmail: async (req, res) => {
    try {
      const {emailReq} = req.body;

      const user = await User.findOne({email: emailReq });
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ peri: err.message });
    }
  },


  sendEmail: async (req, res) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "bytech.fatec.api@gmail.com",
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    const {email} = req.body;
    const code =  Math.floor(100000 + Math.random() * 900000)
    const info = await transporter.sendMail({
      from: '"Bytech" <bytech.fatec.api@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Mudança de senha", // Subject line
      text: String(code), // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    res.status(200).json({ message: code});
    console.log("Message sent: %s", info.messageId);
  }
}

