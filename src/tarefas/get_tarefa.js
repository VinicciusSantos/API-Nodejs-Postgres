const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando tarefas pelo ID
tarefas.get('/tarefas/:id', authenticateToken, async (req, res) => { 
    const id = req.params.id

    const tarefa = await cliente
                            .query(`SELECT * FROM tarefas WHERE tr_id = $1`, [id])
                            .catch(e => {            
                                return res.status(400).json(e)
                            })
    
    const subTarefas = await cliente
                                .query(`SELECT * FROM subTarefas WHERE fk_tarefa = $1 order by id`, [id])
                                .catch(e => {            
                                    return res.status(400).json(e)
                                })

    const results = tarefa.rows[0]
    results.subTarefas = subTarefas.rows

    return res.status(200).json(results)
})

module.exports = tarefas