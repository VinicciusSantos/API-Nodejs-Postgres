const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando todas as equipes
equipes.get('/equipes/fotos', authenticateToken, async (req, res) => { 
    const fotos = await cliente.query(`SELECT * FROM fotos_padrao`)
    return res.status(200).json(fotos.rows)
})

module.exports = equipes