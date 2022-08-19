const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando subtarefas
tarefas.delete('/subtarefas/:id', (req, res) => { 
    const id = req.params.id
    
    cliente
        .query('DELETE FROM subTarefas WHERE id = $1', [id]).catch(e => {
        return res.status(400).json(e)
        })
        .catch(e => {            
            return res.status(400).json(e)
        })
    
        return res.json("Deletado com sucesso!")
})

module.exports = tarefas