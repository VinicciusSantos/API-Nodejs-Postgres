const express = require('express')
const cargos = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando todas as atualizações
cargos.get('/cargos', authenticateToken, (req, res) => { 
    cliente
        .query(`SELECT pe_cargo as cargo, count(*) as qtd FROM pessoas GROUP BY pe_cargo ORDER BY pe_cargo`)
        .then(results => {
        return res.json(results.rows)
        })
        .catch(e => {            
            return res.status(400).json(e)
        })
    })
module.exports = cargos