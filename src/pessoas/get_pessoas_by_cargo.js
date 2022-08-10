const express = require('express')
const cargos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando tuma atualizacao especifica
cargos.get('/cargos/:cargo', (req, res) => { 
    const cargo = req.params.cargo
    cliente
        .query(`SELECT * FROM pessoas WHERE pe_cargo = $1 ORDER BY pe_id`, [cargo])
        .then(results => {
            return res.json(results.rows[0])
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
})

module.exports = cargos