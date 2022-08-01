const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as tarefas
tarefas.get('/tarefas', async (req, res) => { 
    const lista_tarefas = await cliente.query(`SELECT tr.*, pr.pr_nome from tarefas AS tr
                INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_tarefa = tr.tr_id
                INNER JOIN projetos AS pr ON pr.pr_id = ppt.fk_projeto
                ORDER BY tr.tr_nome`)

    const lista_pessoas = await cliente.query(`SELECT pe.*, tr.tr_id FROM pessoas AS pe
                                         INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                                         INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                                         ORDER BY tr.tr_id`)

    let results = {
        dados: lista_tarefas.rows
    }

    lista_tarefas.rows.forEach((tarefa, index) => {
        results.dados[index].pessoas = lista_pessoas.rows.filter((pessoa) => pessoa.tr_id === tarefa.tr_id)
    });

    return res.json(results)
})


module.exports = tarefas