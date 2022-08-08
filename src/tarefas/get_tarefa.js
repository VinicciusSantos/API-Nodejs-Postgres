const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando tarefas pelo ID
tarefas.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT * FROM tarefas WHERE tr_id = $1`, [id])
        .then(results => {
        return res.json(results.rows[0])
<<<<<<< HEAD
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
    })
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = tarefas