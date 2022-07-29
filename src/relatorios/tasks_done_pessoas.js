const express = require('express')
const relatorios = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Retorna as tarefas concluidas por uma pessoa em cada mês
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