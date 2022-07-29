const express = require('express')
const relatorios = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Retorna os projetos concluidos em cada mês
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

module.exports = relatorios