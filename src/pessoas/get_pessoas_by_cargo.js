const express = require('express')
const cargos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando tuma atualizacao especifica
cargos.get('/cargos/:cargo', (req, res) => { 
    const cargo = req.params.cargo
    cliente
        .query(`SELECT * FROM pessoas WHERE pe_cargo = $1 ORDER BY pe_id`, [id])
        .then(results => {
<<<<<<< HEAD
            return res.json(results.rows[0])
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
        return res.json(results.rows[0])
    })
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = cargos