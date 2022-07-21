const express = require('express')
const cargos = express.Router()
var cliente = require('../database/connection.js')

// Mostrando todas as atualizações
cargos.get('/cargos', (req, res) => { 
    cliente
        .query(`SELECT pe_cargo as cargo, count(*) as qtd FROM pessoas GROUP BY pe_cargo ORDER BY pe_cargo`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tuma atualizacao especifica
cargos.get('/cargos/:cargo', (req, res) => { 
    const cargo = req.params.cargo
    cliente
        .query(`SELECT * FROM pessoas WHERE pe_cargo = $1 ORDER BY pe_id`, [id])
        .then(results => {
        return res.json(results.rows[0])
    })
})

module.exports = cargos