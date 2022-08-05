const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as equipes
equipes.get('/equipes', async (req, res) => { 
    const equipes = await cliente.query(`SELECT * FROM equipes`)

    const equipes_pessoas = await cliente.query(`SELECT pe.*, eq.eq_id FROM equipes as eq
                                                 INNER JOIN pessoas_pertencem_equipes as ppe on ppe.fk_equipe = eq.eq_id
                                                 INNER JOIN pessoas as pe on pe.pe_id = ppe.fk_pessoa`)

    const equipes_projetos = await cliente.query(`SELECT pr.*, eq.eq_id FROM equipes AS eq
                                                  INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_equipe = eq.eq_id
                                                  INNER JOIN projetos AS pr ON pr.pr_id = ppe.fk_projeto`)
    const results = []

    // pegar as pessoas da equipe
    equipes.rows.forEach((e, index) => {
        results[index] = e
        results[index].pessoas = equipes_pessoas.rows.filter(d => d.eq_id == e.eq_id)
        results[index].projetos = equipes_projetos.rows.filter(p => p.eq_id == e.eq_id)
    })

    return res.json(results)
})

module.exports = equipes