const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const authenticateToken = require('../../cmd/jwt')

// Deletando pessoas
pessoas.delete("/pessoas/:id", authenticateToken, (req, res) => {
    const id = req.params.id;

    cliente
        .query("DELETE FROM pessoas WHERE pe_id = $1", [id])
        .then((results) => {
            return res.json("Deletado com sucesso!");
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});


module.exports = pessoas;