const express = require("express");
const lembretes = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando todas as lembretes
lembretes.get("/lembretes", (req, res) => {
    cliente
        .query(`SELECT * FROM lembretes`)
        .then((results) => {
            return res.json(results.rows)
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = lembretes;