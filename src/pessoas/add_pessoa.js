const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const multer = require('multer');
const multerConfig = require('../../cmd/multer');
const { s3Uploadv2 } = require("../../cmd/s3Service.js");

// Inserindo pessoas
pessoas.post("/pessoas", multer(multerConfig).single('foto'), async (req, res) => {
    const body = req.body;
    const result = await s3Uploadv2(req.file)
    console.log(result)

    if (body.pe_nome === "" || !body.pe_nome) {
        return res.status(400).json('Nome Inválido')
    }
    
    cliente
        .query(`INSERT INTO pessoas (pe_nome, pe_cargo, pe_salario, pe_data_nasc, pe_status, pe_foto)
                VALUES ($1, $2, $3, $4, $5, $6)`, [ body.pe_nome, body.pe_cargo, body.pe_salario, body.pe_data_nasc, "Não Iniciado", result.Location])
        .then((results) => {
            return res.json(result);
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;