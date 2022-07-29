const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todos os Status que estão sendo utilizados
projetos.get('/projetos/status', async (req, res) => {
    const results = await cliente.query(`SELECT pr_status, count(*) FROM projetos GROUP BY pr_status`)
    
    if (results.rowCount == 0) {
        return res.status(404).json("Não Existem Status Cadastrados!")
    }

    return res.status(200).json(results.rows)
})

module.exports = projetos