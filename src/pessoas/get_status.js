const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const authenticateToken = require('../../cmd/jwt')

// Mostrando todos os Status que estão sendo utilizados
pessoas.get("/pessoas/status", authenticateToken, (req, res) => {
    cliente
        .query(`SELECT pe_status, count(*) FROM pessoas GROUP BY pe_status`)
        .then((results) => {
            return res.json(results.rows);
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;