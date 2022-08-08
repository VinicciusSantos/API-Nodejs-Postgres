const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrar as pessoas de uma equipe
equipes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, eq.eq_nome FROM pessoas AS pe
                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.pe_id
                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                WHERE eq.eq_id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
<<<<<<< HEAD
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = equipes