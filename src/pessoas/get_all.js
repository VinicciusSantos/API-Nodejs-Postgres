const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando todas as pessoas
pessoas.get("/pessoas", (req, res) => {
    cliente
        .query(
            `SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, pe.pe_salario, pe.pe_data_nasc, pe.pe_status
                FROM pessoas AS pe              
                ORDER BY pe_id`
        )
        .then((results) => {
            return res.json(results.rows);
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;