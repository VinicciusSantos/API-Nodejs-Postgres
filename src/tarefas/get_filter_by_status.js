const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando tarefas com um status específico
tarefas.get('/tarefas/status/:status', authenticateToken, (req, res) => {
    const status = req.params.status

    cliente
        .query(`SELECT * FROM tarefas
                WHERE tr_status = $1`, [status])
        .then(results => {
            return res.json(results.rows)
        })
        .catch(e => {            
            return res.status(400).json(e)
        })
})

module.exports = tarefas