const express = require('express')
const cargos = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando tuma atualizacao especifica
cargos.get('/cargos/:cargo', authenticateToken, (req, res) => { 
    const cargo = req.params.cargo
    cliente
        .query(`SELECT * FROM pessoas WHERE pe_cargo = $1 ORDER BY pe_id`, [cargo])
        .then(results => {
            return res.json(results.rows)
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
})

module.exports = cargos