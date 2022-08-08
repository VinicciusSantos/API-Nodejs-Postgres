const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Editando tarefas
tarefas.put('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

<<<<<<< HEAD
    cliente
        .query('UPDATE tarefas SET tr_nome = $1, tr_descricao = $2, tr_data_criacao = $3, tr_prioridade = $4 WHERE id = $5', [body.tr_nome, body.tr_descricao,  body.tr_data_criacao, body.tr_prioridade,id])
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
    cliente.query('UPDATE tarefas SET tr_nome = $1, tr_descricao = $2, tr_data_criacao = $3, tr_prioridade = $4 WHERE id = $5', [body.tr_nome, body.tr_descricao, body.tr_data_criacao, body.tr_prioridade,id])
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
    return res.json("Alterado com sucesso!")
})


module.exports = tarefas