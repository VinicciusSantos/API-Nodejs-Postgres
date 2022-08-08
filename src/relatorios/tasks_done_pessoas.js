const express = require('express')
const relatorios = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Retorna as tarefas concluidas por uma pessoa em cada mês
relatorios.get('/relatorios/pessoas/:id', async (req, res) => { 
    const id = req.params.id

    // Verificando se tem tarefas finalizadas pela pessoa para realizar o calculo
    const qtd = await cliente.query(`SELECT COUNT(*) FROM tarefas AS tr
                                    INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
                                    INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
                                    WHERE pe.pe_id = $1 AND tr.tr_data_finalizacao IS NOT NULL`, [id])
<<<<<<< HEAD
                            .catch(e => {
                                
                                return res.status(400).json(e)
                            })
=======
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)

    if (qtd.rows[0].count == 0) {
        const vazio = await cliente.query(`SELECT
                                           EXTRACT(MONTH FROM CURRENT_DATE) AS mes,
                                           EXTRACT(YEAR FROM CURRENT_DATE) AS ano,
                                           0 AS quantidade`)
<<<<<<< HEAD
                                    .catch(e => {
                                        
                                        return res.status(400).json(e)
                                    })
=======
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
        return res.json(vazio.rows)
    }

    cliente
        .query(`SELECT EXTRACT(MONTH FROM tr.tr_data_finalizacao) AS mes, EXTRACT(YEAR FROM tr.tr_data_finalizacao) AS ano, COUNT(*) FROM tarefas AS tr
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
                INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
                WHERE pe.pe_id = $1 AND tr.tr_status = 'Concluido'
                GROUP BY EXTRACT(MONTH FROM tr.tr_data_finalizacao), EXTRACT(YEAR FROM tr.tr_data_finalizacao)`, [id])
        .then(results => {
<<<<<<< HEAD
            return res.json(results.rows)
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
        return res.json(results.rows)
    })
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = relatorios