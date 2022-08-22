const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando todas as tarefas
tarefas.get('/tarefas', authenticateToken, async (req, res) => { 
    const lista_tarefas = await cliente
                                        .query(`SELECT tr.*, pr.pr_nome from tarefas AS tr
                                                LEFT JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_tarefa = tr.tr_id
                                                LEFT JOIN projetos AS pr ON pr.pr_id = ppt.fk_projeto
                                                ORDER BY tr.tr_prioridade desc, tr_nome`)
                                        .catch(e => {                                           
                                            return res.status(400).json(e)
                                        })

    const lista_pessoas = await cliente
                                        .query(`SELECT pe.*, tr.tr_id FROM pessoas AS pe
                                                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                                                INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                                                ORDER BY tr.tr_id`)
                                        .catch(e => {                                            
                                            return res.status(400).json(e)
                                        })

    const lista_subtarefas = await cliente
                                        .query(`SELECT * FROM subTarefas`)
                                        .catch(e => {                                            
                                            return res.status(400).json(e)
                                        })

    let results = lista_tarefas.rows


    lista_tarefas.rows.forEach((tarefa, index) => {
        results[index].pessoas = lista_pessoas.rows.filter((pessoa) => pessoa.tr_id === tarefa.tr_id)
        results[index].subTarefas = lista_subtarefas.rows.filter(subtarefa => subtarefa.fk_tarefa === tarefa.tr_id)
    });

    return res.json(results)
})


module.exports = tarefas