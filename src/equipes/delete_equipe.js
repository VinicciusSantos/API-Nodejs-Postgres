const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando equipes
equipes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

<<<<<<< HEAD
    cliente
        .query('DELETE FROM equipes WHERE eq_id = $1', [id])
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
    cliente.query('DELETE FROM equipes WHERE eq_id = $1', [id])
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
    return res.json("Deletado com sucesso!")
})

module.exports = equipes