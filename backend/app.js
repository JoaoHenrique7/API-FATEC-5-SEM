// const express = require('express')
// const mongoose = require('mongoose')
// require('dotenv/config')

// const username = process.env.MONGO_USER
// const password = process.env.MONGO_PASS
// const db_connection = `mongodb+srv://${username}:${password}@api-fatec.71wbtkk.mongodb.net/`

// const app = express()
// app.use(express.json())
// const port = 3000

// const Team = mongoose.model('Team', {
//     full_name: String,
//     name: String,
//     division: String,
//     conference: String, 
//     abbreviation: String, 
//     city: String, 
// })

// //get
// app.get("/", async (req, res) => {
//     const teams = await Team.find()
//     return res.send(teams)
// })

// //post
// app.post("/", async (req, res) => {
//     const team = new Team({
//         full_name: req.body.full_name,
//         name: req.body.name,
//         division: req.body.division,
//         conference: req.body.conference,
//         abbreviation: req.body.abbreviation,
//         city: req.body.city,
//     })
//     await team.save()

//     return res.send(team)
// })

// //put
// app.put("/:id", async (req, res) => {
//     const team = await Team.findByIdAndUpdate(req.params.id, {
//         full_name: req.body.full_name,
//         name: req.body.name,
//         division: req.body.division,
//         conference: req.body.conference,
//         abbreviation: req.body.abbreviation,
//         city: req.body.city,
//     }, {
//         new: true
//     })
//     return res.send(team)
// })

// //delete
// app.delete("/:id", async (req, res) => {
//     const team = await Team.findByIdAndDelete(req.params.id)
//     return res.send(team)
// })


// app.listen(port, () => {
//     mongoose.connect(db_connection);
//     `Backend rodando na porta: ${port}`
// })



const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const routes = require('./src/routes');

const app = express();
const port = 3000
app.use(express.json());

// conectando ao MongoDB
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASS
const db_connection = process.env.MONGO_CONNECTION

// rotas
app.use('/teams', routes.team)

// iniciando o servidor
app.listen(port, () => {
    mongoose.connect(db_connection);
    console.log(`Backend rodando na porta: ${port}`)
})
