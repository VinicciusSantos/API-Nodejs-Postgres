const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando equipes específicas pelo ID
equipes.get('/equipes/:id', async (req, res) => { 
    const id = req.params.id

    // Recebendo todas as informações da equipe
    try {
        var dados = await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id])
    } catch (err) {
        return res.status(400).send(err.stack)
    }
    
    if (dados.rowCount == 0) return res.status(404).json(`Nenhuma Equipe Encontrada com o ID: ${id}`)

    const pessoas = await cliente
                        .query(`SELECT pe.* FROM equipes AS eq
                                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_equipe = eq.eq_id
                                INNER JOIN pessoas AS pe ON pe.pe_id = ppe.fk_pessoa
                                WHERE eq.eq_id = $1`, [id])
                        .catch(e => {                             
                            return res.status(400).json(e)
                        })

    const results = dados.rows[0]
    results.pessoas = pessoas.rows

    const tarefas = await cliente
                        .query(`SELECT tr.*, eq.eq_id, pe.pe_id FROM equipes AS eq
                                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_equipe = eq.eq_id
                                INNER JOIN pessoas AS pe ON pe.pe_id = ppe.fk_pessoa
                                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                                INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                                WHERE eq.eq_id = $1`, [id])
                        .catch(e => {                             
                            return res.status(400).json(e)
                        })

    pessoas.rows.forEach((p, index) => {
        results.pessoas[index].tarefas = tarefas.rows.filter(t => t.pe_id === p.pe_id)
    })
    
    return res.status(200).json(results)
})

module.exports = equipes