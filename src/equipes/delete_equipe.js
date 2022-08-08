const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando equipes
equipes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('DELETE FROM equipes WHERE eq_id = $1', [id])
        .catch(e => {
            console.log(e)
            return res.status(400).json(e)
        })
    return res.json("Deletado com sucesso!")
})

module.exports = equipes