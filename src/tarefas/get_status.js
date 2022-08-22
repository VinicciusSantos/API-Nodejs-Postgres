const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando todos os Status que estão sendo utilizados
tarefas.get('/tarefas/status', authenticateToken, (req, res) => {
    cliente
        .query(`SELECT tr_status, count(*) FROM tarefas GROUP BY tr_status`)
        .then(results => {
            return res.json(results.rows)
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
})

module.exports = tarefas