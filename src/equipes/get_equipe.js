const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrando equipes específicas pelo ID
equipes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE eq_id = $1', [id])
        .then(results => {
<<<<<<< HEAD
            return res.json(results.rows[0])
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
        return res.json(results.rows[0])
    })
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = equipes