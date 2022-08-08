const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Associar Tarefas com Pessoas
pessoas.post("/pessoas/:id_pessoa/tarefas/:id_tarefa", (req, res) => {
    const id_pessoa = req.params.id_pessoa;
    const id_tarefa = req.params.id_tarefa;

    cliente
        .query(
            `INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa)
                VALUES ($1, $2)`,
            [id_pessoa, id_tarefa]
        )
        .then((r) => {
            return res.json("Tarefa inserida no projeto");
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
});


module.exports = pessoas;