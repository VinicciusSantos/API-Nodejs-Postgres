const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')
const multer = require('multer');
const multerConfig = require('../../cmd/multer');
const { s3Uploadv2 } = require("../../cmd/s3Service.js");

//Inserindo equipes
equipes.post('/equipes/fotos', authenticateToken, multer(multerConfig).single('foto'), async (req, res) => { 
    const body = req.body
    if (req.file) {
        var result = await s3Uploadv2(req.file)
        console.log(result)
    }   

    // cadastrando a equipe
    await cliente.query('INSERT INTO fotos_padrao (link) values ($1)', [result.Location])

    return res.json(result)
})

module.exports = equipes