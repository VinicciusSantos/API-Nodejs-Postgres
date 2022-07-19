const express = require('express')
const relatorios = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todas as atualizações
relatorios.get('/relatorios/projetos', (req, res) => { 
    cliente
        .query(`SELECT
                EXTRACT(MONTH from pr_data_finalizacao) AS mes,
                EXTRACT(YEAR from pr_data_finalizacao) AS ano,
                COUNT(*) FROM projetos AS quantidade
                WHERE pr_data_finalizacao IS NOT NULL
                GROUP BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)
                ORDER BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)`)
        .then(results => {
        return res.json(results.rows)
    })
})

module.exports = relatorios