const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Editando tarefas
tarefas.put('/subtarefas/:id', authenticateToken, (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente
        .query('UPDATE subtarefas SET nome = $1, descricao = $2, prioridade = $3 WHERE id = $4', [body.nome, body.descricao, body.prioridade])
        .catch(e => {            
            return res.status(400).json(e)
        })
    return res.json("Alterado com sucesso!")
})


module.exports = tarefas