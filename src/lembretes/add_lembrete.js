const express = require("express");
const lembretes = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Inserindo lembretes
lembretes.post("/lembretes", (req, res) => {
    const body = req.body;

    if (body.le_nome === "" || !body.le_nome) {
        return res.status(400).json('Nome Inválido')
    }
    
    cliente
        .query(`INSERT INTO lembretes (le_descricao, le_data_lembrete) VALUES ($1, $2)`, [ body.le_descricao, body.le_data_lembrete])
        .then((results) => {
            return res.json("Inserido com sucesso!");
        })
        .catch(e => {          
            return res.status(400).json(e)
        })
});

module.exports = lembretes;