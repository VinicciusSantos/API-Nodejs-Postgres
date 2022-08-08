const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mudar Status de uma pessoa
pessoas.put("/pessoas/:id/status/:status", (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    // Mundando o status de uma pessoaz
    cliente
        .query(`UPDATE pessoas SET pe_status = $1 WHERE pe_id = $2`, [status, id,])
        .catch(e => {
            
            return res.status(400).json(e)
        })
    return res.json("Status Atualizado");
});

module.exports = pessoas;