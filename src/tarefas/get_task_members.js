const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrar pessoas com uma mesma tarefa
tarefas.get('/tarefas/:id/pessoas', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT tr.tr_id, tr.tr_nome, pe.pe_id, pe.pe_nome FROM tarefas AS tr
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
                INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
                WHERE tr.tr_id = $1`, [id])
        .then(results => {
        return res.json(results.rows)
<<<<<<< HEAD
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
    })
})

module.exports = tarefas