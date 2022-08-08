const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Associar Pessoa com Equipe
equipes.post('/equipes/:id_equipe/pessoas/:id_pessoa', (req, res) => { 
    const id_equipe = req.params.id_equipe
    const id_pessoa = req.params.id_pessoa

    cliente
        .query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoas, fk_equipes)
                VALUES ($1, $2)`, [id_pessoa, id_equipe])
        .catch(e => {
            
            return res.status(400).json(e)
        })

    return res.json("Pessoa Inserida na Equipe")
})

module.exports = equipes