const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

//Inserindo Tarefas
tarefas.post('/tarefas', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO tarefas (tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_prioridade) values ($1, $2, $3, $4, $5)', [body.tr_nome, body.tr_descricao, body.tr_data_criacao, 'Inicio', body.tr_prioridade])
    return res.json("Inserido com sucesso!")
})

module.exports = tarefas