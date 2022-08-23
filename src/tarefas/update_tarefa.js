const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Editando tarefas
tarefas.put('/tarefas/:id', authenticateToken, async (req, res) => { 
    const id = req.params.id
    const body = req.body
    console.log(body)

    cliente
        .query('UPDATE tarefas SET tr_nome = $1, tr_descricao = $2, tr_prioridade = $3 WHERE tr_id = $4', [body.tr_nome, body.tr_descricao, body.tr_prioridade,id])
        .catch(e => {            
            return res.status(400).json(e)
        })
        
        return res.status(200).json("Alterado com sucesso!")
})


module.exports = tarefas