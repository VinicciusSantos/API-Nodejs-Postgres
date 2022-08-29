const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

//Inserindo Tarefas
tarefas.put('/tarefas/:id/check/:status', authenticateToken, async (req, res) => { 
    const { id, status } = req.params

    if (!status || !id)
        return res.status(400).json({message: `Valores Obrigatórios não recebidos`})

    if (status != 1 && status != 0)
        return res.status(400).json({message: `Status Inválido, possíveis: 0-1`})

    const tarefa = await cliente
                            .query(`SELECT * FROM tarefas WHERE tr_id = $1`, [id])
                            .catch((err) => { return res.status(400).json(err) })

    if (tarefa.rowCount != 1) return res.status(404).json({message: `Erro ao encontrar a Tarefa`})

    cliente.query(`UPDATE subtarefas SET status = $1
                   WHERE fk_tarefa = $2`, [status, id])

    return res.status(200).json({message: `Deu Certo`})
})

module.exports = tarefas