const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando todos os Status que estão sendo utilizados
pessoas.get("/pessoas/status", (req, res) => {
    cliente
        .query(`SELECT pe_status, count(*) FROM pessoas GROUP BY pe_status`)
        .then((results) => {
            return res.json(results.rows);
        });
});

module.exports = pessoas;