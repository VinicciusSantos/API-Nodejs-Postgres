const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

//Inserindo Sub Tarefas
tarefas.post('/subtarefas/:tarefa', authenticateToken, async (req, res) => { 
    const body = req.body
    const tarefa = req.params.tarefa

    const results = await cliente
                                .query(`INSERT INTO subTarefas (nome, prioridade, fk_tarefa, status)
                                        VALUES ($1, $2, $3, 0)`, [body.nome, body.prioridade, tarefa])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })

    return res.status(200).json(`SubTarefa Adicionada com sucesso`)
})

module.exports = tarefas