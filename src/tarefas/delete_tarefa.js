const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Deletando tarefas
tarefas.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id
<<<<<<< HEAD
    cliente
        .query('DELETE FROM tarefas WHERE tr_id = $1', [id]).catch(e => {
        return res.status(400).json(e)
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
    
        return res.json("Deletado com sucesso!")
=======
    cliente.query('DELETE FROM tarefas WHERE tr_id = $1', [id])
    return res.json("Deletado com sucesso!")
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
})

module.exports = tarefas