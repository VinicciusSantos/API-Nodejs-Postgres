const express = require("express");
const lembretes = express.Router();
var cliente = require("../../cmd/database/connection.js");
const authenticateToken = require('../../cmd/jwt')

// Mostrando todas as lembretes
lembretes.get("/lembretes", authenticateToken, (req, res) => {
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