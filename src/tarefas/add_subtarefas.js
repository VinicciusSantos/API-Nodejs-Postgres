const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

//Inserindo Sub Tarefas
tarefas.post('/subtarefas/:tarefa', authenticateToken, async (req, res) => { 
    const body = req.body
    const tarefa = req.params.tarefa

    const results = await cliente
                                .query(`INSERT INTO subTarefas (nome, descricao, prioridade, fk_tarefa, status)
                                        VALUES ($1, $2, $3, $4, 0)`, [body.nome, body.descricao, body.prioridade, tarefa])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })

    return res.status(200).json(`Sub Tarefa Adicionada com sucesso`)
})

module.exports = tarefas