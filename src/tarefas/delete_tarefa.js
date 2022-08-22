const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Deletando tarefas
tarefas.delete('/tarefas/:id', authenticateToken, (req, res) => { 
    const id = req.params.id
    cliente
        .query('DELETE FROM tarefas WHERE tr_id = $1', [id]).catch(e => {
        return res.status(400).json(e)
        })
        .catch(e => {            
            return res.status(400).json(e)
        })
    
        return res.json("Deletado com sucesso!")
})

module.exports = tarefas