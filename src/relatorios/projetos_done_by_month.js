const express = require('express')
const relatorios = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Retorna os projetos concluidos em cada mês
relatorios.get('/relatorios/projetos', async (req, res) => { 

    // Verificando se tem projetos finalizados para fazer o calculo
    const qtd = await cliente.query(`SELECT COUNT(*) FROM projetos WHERE pr_data_finalizacao IS NOT NULL`)

    if (qtd.rows[0].count == 0) {
        const vazio = await cliente.query(`SELECT
                                           EXTRACT(MONTH FROM CURRENT_DATE) AS mes,
                                           EXTRACT(YEAR FROM CURRENT_DATE) AS ano,
                                           0 AS quantidade`)
        return res.json(vazio.rows)
    }

    // Buscando os dados da quantidade de projetos finalizados por mês
    const dados = await cliente.query(`SELECT
                                       EXTRACT(MONTH from pr_data_finalizacao) AS mes,
                                       EXTRACT(YEAR from pr_data_finalizacao) AS ano,
                                       COUNT(*) as concluidos FROM projetos AS quantidade
                                       WHERE pr_data_finalizacao IS NOT NULL
                                       GROUP BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)
                                       ORDER BY EXTRACT(MONTH from pr_data_finalizacao), EXTRACT(YEAR FROM pr_data_finalizacao)`)
    
    return res.json(dados.rows)
})

module.exports = relatorios