const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Associar Tarefa com Projeto
projetos.post('/projetos/:id_projeto/tarefas/_id_tarefa', (req, res) => { 
    const id_projeto = req.params.id_projeto
    const id_tarefa = req.params.id_tarefa

    cliente
        .query(`INSERT INTO projetos_posssuem_tarefas (fk_projeto, fk_tarefa)
                VALUES ($1, $2)`, [id_projeto, id_tarefa])
        .then(results => {
            return res.status(201).json(results.rows)
        })
})

module.exports = projetos