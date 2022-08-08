const express = require("express");
const lembretes = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando todas as lembretes
lembretes.get("/lembretes", (req, res) => {
    cliente.query(`SELECT * FROM lembretes`)
        .then((results) => {
<<<<<<< HEAD
            return res.json(results.rows)
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
            return res.json(results.rows);
        });
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
});

module.exports = lembretes;