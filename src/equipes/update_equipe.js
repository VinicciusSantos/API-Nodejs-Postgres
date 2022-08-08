const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Editando equipes
equipes.put('/equipes/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

<<<<<<< HEAD
    cliente
        .query('UPDATE equipes SET eq_nome = $1 WHERE eq_id = $2', [body.eq_nome, id])
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
    cliente.query('UPDATE equipes SET eq_nome = $1 WHERE eq_id = $2', [body.eq_nome, id])
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
    return res.json("Alterado com sucesso!")
})

module.exports = equipes