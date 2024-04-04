const Team = require('../models/team.model');

module.exports = {

  // Rota para criar um team
  createTeam: async (req, res) => {
    try {
      const newTeam = new Team({
        name: req.body.name,
        description: req.body.description,
      });
      await newTeam.save();
      res.status(201).json(newTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Rota para obter todos os teams
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.find();
      res.json(teams);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Rota para obter um único team
  getTeamById: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (team == null) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(team);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para atualizar um team
  updateTeam: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (team == null) {
        return res.status(404).json({ message: 'Team not found' });
      }
      if (req.body.name != null) {
        team.name = req.body.name;
      }
      if (req.body.description != null) {
        team.description = req.body.description;
      }
      await team.save();
      res.json(team);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Rota para excluir um team
  deleteTeam: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (team == null) {
        return res.status(404).json({ message: 'Team not found' });
      }
      await team.remove();
      res.json({ message: 'Team deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

}

