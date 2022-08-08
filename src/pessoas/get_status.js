const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando todos os Status que estão sendo utilizados
pessoas.get("/pessoas/status", (req, res) => {
    cliente
        .query(`SELECT pe_status, count(*) FROM pessoas GROUP BY pe_status`)
        .then((results) => {
            return res.json(results.rows);
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