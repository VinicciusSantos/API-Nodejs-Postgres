const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Editando tarefas
tarefas.put('/subtarefas/:id', authenticateToken, (req, res) => { 
    const id = req.params.id
    const body = req.body
    console.log(body)

    cliente
        .query('UPDATE subtarefas SET nome = $1, prioridade = $2 WHERE id = $3', [body.nome, body.prioridade, id])
        .catch(e => {            
            return res.status(400).json(e)
        })
    return res.json("Alterado com sucesso!")
})


module.exports = tarefas