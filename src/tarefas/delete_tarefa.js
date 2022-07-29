const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando tarefas
tarefas.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    cliente.query('DELETE FROM tarefas WHERE tr_id = $1', [id])
    return res.json("Deletado com sucesso!")
})

module.exports = tarefas