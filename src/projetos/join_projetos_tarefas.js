const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Associar Tarefa com Projeto
projetos.post('/projetos/:id_projeto/tarefas/:id_tarefa', authenticateToken, (req, res) => { 
    const id_projeto = req.params.id_projeto
    const id_tarefa = req.params.id_tarefa

    cliente
        .query(`INSERT INTO projetos_posssuem_tarefas (fk_projeto, fk_tarefa)
                VALUES ($1, $2)`, [id_projeto, id_tarefa])
        .then(results => {
            return res.status(201).json(results.rows)
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
})

module.exports = projetos