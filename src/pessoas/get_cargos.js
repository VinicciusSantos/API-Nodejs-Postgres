const express = require('express')
const cargos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando todas as atualizações
cargos.get('/cargos', (req, res) => { 
    cliente
        .query(`SELECT pe_cargo as cargo, count(*) as qtd FROM pessoas GROUP BY pe_cargo ORDER BY pe_cargo`)
        .then(results => {
        return res.json(results.rows)
        .catch(e => {
            console.log(e)
            return res.status(400).json(e)
        })
    })
})

module.exports = cargos