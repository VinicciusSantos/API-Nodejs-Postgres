const express = require('express')
const relatorios = express.Router()

const projetos_done_by_month = require('./projetos_done_by_month')
const tasks_done_pessoas = require('./tasks_done_pessoas')
const desempenho_pessoas_equipe = require('./desempenho_pessoas_equipe')

relatorios.use(projetos_done_by_month)
relatorios.use(tasks_done_pessoas)
relatorios.use(desempenho_pessoas_equipe)

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