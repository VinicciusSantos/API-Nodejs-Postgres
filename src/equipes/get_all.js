const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as equipes
equipes.get('/equipes', (req, res) => { 
    cliente
        .query(`SELECT * from equipes`)
        .then(results => {
        return res.json(results.rows)
    })
})

module.exports = equipes