const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando tarefas com uma prioridade específica
tarefas.get('/tarefas/prioridade/:prioridade', (req, res) => {
    const prioridade = req.params.prioridade

    cliente
        .query(`SELECT * FROM tarefas
                WHERE tr_prioridade = $1`, [prioridade])
        .then(results => {
            return res.json(results.rows)
        })
        .catch(e => {            
            return res.status(400).json(e)
        })
})


module.exports = tarefas