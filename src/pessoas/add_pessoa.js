const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Inserindo pessoas
pessoas.post("/pessoas", (req, res) => {
    const body = req.body;
    cliente
        .query(`INSERT INTO pessoas (pe_nome, pe_cargo, pe_salario, pe_data_nasc, pe_status)
                VALUES ($1, $2, $3, $4, $5)`, [ body.pe_nome, body.pe_cargo, body.pe_salario, body.pe_data_nasc, "Não Iniciado",])
        .then((results) => {
            return res.json("Inserido com sucesso!");
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;