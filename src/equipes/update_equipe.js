const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Editando equipes
equipes.put('/equipes/:id', async (req, res) => { 
    const id = req.params.id
    const body = req.body

    // Verificando a existencia da equipe
    try {
        var dados = await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id])
    } catch (err) {
        return res.status(400).send(err)
    }

    if (dados.rowCount == 0) return res.status(404).json(`Equipe ${id} não encontrada`)


    cliente
        .query('UPDATE equipes SET eq_nome = $1 WHERE eq_id = $2', [body.eq_nome, id])
        .catch(e => {         
            return res.status(400).json(e)
        })
    return res.json("Alterado com sucesso!")
})

module.exports = equipes