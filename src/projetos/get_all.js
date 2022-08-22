const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')
// const authenticateToken = require('../../cmd/jwt')

// Mostrando todos os Projetos
// projetos.get('/projetos', authenticateToken, async (req, res) => { 
projetos.get('/projetos', authenticateToken, async (req, res) => { 
    const results = await cliente
                                .query(`SELECT * FROM projetos ORDER BY pr_id`)
                                .catch(e => {
                                    return res.status(400).json(e)
                                })
    
    if (results.rowCount == 0) {
        return res.status(404).json("Não Existem Projetos Cadastrados!")
    }

    return res.status(200).json(results.rows)
})

module.exports = projetos