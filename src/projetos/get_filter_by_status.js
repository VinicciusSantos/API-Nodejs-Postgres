const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando projetos com um status específico
projetos.get('/projetos/status/:status', (req, res) => {
    const status = req.params.status

    cliente
        .query(`SELECT * FROM projetos
                WHERE pr_status = $1`, [status])
        .then(results => {
            return res.status(200).json(results.rows)
        })
<<<<<<< HEAD
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})


module.exports = projetos