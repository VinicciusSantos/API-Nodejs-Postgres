const express = require('express')
const relatorios = express.Router()
var cliente = require('../database/connection.js')


relatorios.get('/relatorios/projetos', (req, res) => { 
    cliente
        .query(`SELECT
                EXTRACT(MONTH from pr_data_finalizacao) AS mes,
                EXTRACT(YEAR from pr_data_finalizacao) AS ano,
                COUNT(*) as concluidos FROM projetos AS quantidade
                WHERE pr_data_finalizacao IS NOT NULL
                GROUP BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)
                ORDER BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)`)
        .then(results => {
        return res.json(results.rows)
    })
})

relatorios.get('/relatorios/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT EXTRACT(MONTH FROM tr.tr_data_finalizacao) AS mes, EXTRACT(YEAR FROM tr.tr_data_finalizacao) AS ano, COUNT(*) FROM tarefas AS tr
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
                INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
                WHERE pe.pe_id = $1 AND tr.tr_status = 'Concluido'
                GROUP BY EXTRACT(MONTH FROM tr.tr_data_finalizacao), EXTRACT(YEAR FROM tr.tr_data_finalizacao)`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

module.exports = relatorios


/*
SELECT 
EXTRACT(MONTH FROM tr.tr_data_finalizacao) AS mes,
EXTRACT(YEAR FROM tr.tr_data_finalizacao) AS ano,

(SELECT COUNT(*) as desenvolvendo
FROM tarefas AS tr
INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
WHERE pe.pe_id = 12 AND tr.tr_status = 'Em Desenvolvimento'
GROUP BY EXTRACT(MONTH FROM tr.tr_data_finalizacao), EXTRACT(YEAR FROM tr.tr_data_finalizacao)),

(SELECT COUNT(*) as nao_iniciados
FROM tarefas AS tr
INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
WHERE pe.pe_id = 12 AND tr.tr_status = 'Nao Iniciado'
GROUP BY EXTRACT(MONTH FROM tr.tr_data_finalizacao), EXTRACT(YEAR FROM tr.tr_data_finalizacao)),

COUNT(*) as concluidos
FROM tarefas AS tr
INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
WHERE pe.pe_id = 12 AND tr.tr_status = 'Concluido'
GROUP BY EXTRACT(MONTH FROM tr.tr_data_finalizacao), EXTRACT(YEAR FROM tr.tr_data_finalizacao)
*/