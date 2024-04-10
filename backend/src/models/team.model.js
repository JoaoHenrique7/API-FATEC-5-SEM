const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    full_name: String,
    name: String,
    division: String,
    conference: String, 
    abbreviation: String, 
    city: String,
});

module.exports = mongoose.model('Team', teamSchema);