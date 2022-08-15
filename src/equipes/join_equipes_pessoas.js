const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Associar Pessoa com Equipe
equipes.post('/equipes/:id_equipe/pessoas/:id_pessoa', async (req, res) => { 
    const id_equipe = req.params.id_equipe
    const id_pessoa = req.params.id_pessoa

    // Recebendo todas as informações da equipe e da pessoa para saber se eles existem
    try {
        await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id_equipe])
        await cliente.query('SELECT * FROM pessoas WHERE pe_id = $1', [id_pessoa])
    } catch (err) {
        return res.status(400).send(err)
    }

    cliente
        .query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoas, fk_equipes)
                VALUES ($1, $2)`, [id_pessoa, id_equipe])
        .catch(e => {        
            return res.status(400).json(e)
        })

    return res.json("Pessoa Inserida na Equipe")
})

module.exports = equipes