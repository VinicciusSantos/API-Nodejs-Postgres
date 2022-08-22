const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const authenticateToken = require('../../cmd/jwt')

// Mostrando pessoas com um status específico
pessoas.get("/pessoas/status/:status", authenticateToken, (req, res) => {
    const status = req.params.status;

    cliente
        .query(
            `SELECT * FROM pessoas
                WHERE pe_status = $1`,
            [status]
        )
        .then((results) => {
            return res.json(results.rows);
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});


module.exports = pessoas;