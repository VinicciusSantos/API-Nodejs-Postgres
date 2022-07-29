const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mudar Status de uma tarefa
tarefas.put('/tarefas/:id/status/:status', (req, res) => {
    const id = req.params.id
    const status = req.params.status

    // Mundando o status de uma tarefa
    cliente.query(`UPDATE tarefas SET tr_status = $1 WHERE tr_id = $2`, [status, id])
    return res.json('Status Atualizado')
})


module.exports = tarefas