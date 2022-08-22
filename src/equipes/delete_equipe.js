const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Deletando equipes
equipes.delete('/equipes/:id', authenticateToken, async (req, res) => { 
    const id = req.params.id

    // Recebendo as informações da equipe pra saber se ela existe 
    try {
        await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id])
    } catch (err) {
        return res.status(400).send(err)
    }

    cliente
        .query('DELETE FROM equipes WHERE eq_id = $1', [id])
        .catch(e => {           
            return res.status(400).json(e)
        })
    return res.json("Deletado com sucesso!")
})

module.exports = equipes