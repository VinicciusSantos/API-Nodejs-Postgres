const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Deletando pessoas
pessoas.delete("/pessoas/:id", (req, res) => {
    const id = req.params.id;

    cliente
        .query("DELETE FROM pessoas WHERE pe_id = $1", [id])
        .then((results) => {
            return res.json("Deletado com sucesso!");
<<<<<<< HEAD
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
        });
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
});


module.exports = pessoas;