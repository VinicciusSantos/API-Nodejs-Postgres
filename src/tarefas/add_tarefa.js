const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

//Inserindo Tarefas
tarefas.post('/tarefas', async (req, res) => { 
    const body = req.body

    const results = await cliente.query('INSERT INTO tarefas (tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_prioridade) values ($1, $2, $3, $4, $5)', [body.tr_nome, body.tr_descricao, body.tr_data_criacao, 'Inicio', body.tr_prioridade])
    .catch(e => {        
        return res.status(400).json(e)
    })
})

module.exports = tarefas