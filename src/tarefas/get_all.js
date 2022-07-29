const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as tarefas
tarefas.get('/tarefas', (req, res) => { 
    cliente
        .query(`SELECT * FROM tarefas ORDER BY tr_id`)
        .then(results => {
        return res.json(results.rows)
    })
})


module.exports = tarefas