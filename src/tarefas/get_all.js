const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as tarefas
tarefas.get('/tarefas', (req, res) => { 
    cliente
        .query(`SELECT tr.*, pr.pr_nome from tarefas AS tr
                INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_tarefa = tr.tr_id
                INNER JOIN projetos AS pr ON pr.pr_id = ppt.fk_projeto
                ORDER BY tr.tr_nome`)
        .then(results => {
        return res.json(results.rows)
    })
})


module.exports = tarefas