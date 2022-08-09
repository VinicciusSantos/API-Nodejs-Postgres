const express = require('express')
const lembretes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando lembretes
lembretes.delete('/lembretes/:id', (req, res) => { 
    const id = req.params.id
    cliente
        .query('DELETE FROM lembretes WHERE le_id = $1', [id])
        .catch(e => {
            return res.status(400).json(e)
        })
    
        return res.json("Deletado com sucesso!")
})

module.exports = lembretes