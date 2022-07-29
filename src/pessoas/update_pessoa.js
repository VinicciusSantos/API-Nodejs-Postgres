const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Editando pessoas
pessoas.put("/pessoas/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    cliente
        .query(
            `UPDATE pessoas SET pe_nome = $1, pe_data_nasc = $2, pe_cargo = $3, pe_salario = $4
                WHERE pe_id = $5`,
            [body.pe_nome, body.pe_data_nasc, body.pe_cargo, body.pe_salario, id]
        )
        .then((results) => {
            return res.json("Alterado com sucesso!");
        });
});


module.exports = pessoas;