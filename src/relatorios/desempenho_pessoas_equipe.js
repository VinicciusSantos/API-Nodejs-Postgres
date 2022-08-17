const express = require('express')
const relatorios = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Retorna os projetos concluidos em cada mês
relatorios.get('/relatorios/equipes/:id', async (req, res) => {
    const id = req.params.id
    
    // Buscando a quantidade de tarefas feitas por cada pessoa de uma equipe
    const dados = await cliente
                                .query(`SELECT pe.pe_nome, COUNT(tr.tr_id) FROM pessoas AS pe
                                        INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.pe_id
                                        INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                                        INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                                        INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                                        WHERE tr.tr_data_finalizacao IS NOT NULL AND eq.eq_id = $1
                                        GROUP BY pe.pe_nome
                                        ORDER BY COUNT(tr.tr_id) DESC
                                        `, [id])
                                .catch(e => {                                    
                                    return res.status(400).json(e)
                                })
    
    return res.json(dados.rows)
})

module.exports = relatorios