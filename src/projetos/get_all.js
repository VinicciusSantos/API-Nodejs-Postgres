const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todos os Projetos
projetos.get('/projetos', async (req, res) => { 
<<<<<<< HEAD
    const results = await cliente
                                .query(`SELECT * FROM projetos ORDER BY pr_id`)
                                .catch(e => {
                                    return res.status(400).json(e)
                                })
=======
    const results = await cliente.query(`SELECT * FROM projetos ORDER BY pr_id`)
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
    
    if (results.rowCount == 0) {
        return res.status(404).json("Não Existem Projetos Cadastrados!")
    }

    return res.status(200).json(results.rows)
})

module.exports = projetos