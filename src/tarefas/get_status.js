const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todos os Status que estão sendo utilizados
tarefas.get('/tarefas/status', (req, res) => {
    cliente
        .query(`SELECT tr_status, count(*) FROM tarefas GROUP BY tr_status`)
        .then(results => {
            return res.json(results.rows)
        })
})

module.exports = tarefas