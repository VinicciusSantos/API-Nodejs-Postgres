const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando pessoas com um status específico
pessoas.get("/pessoas/status/:status", (req, res) => {
    const status = req.params.status;

    cliente
        .query(
            `SELECT * FROM pessoas
                WHERE pe_status = $1`,
            [status]
        )
        .then((results) => {
            return res.json(results.rows);
        });
});


module.exports = pessoas;