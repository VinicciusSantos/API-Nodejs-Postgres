const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mudar Status de uma tarefa
tarefas.put('/subtarefas/:id/status/:status', authenticateToken, async (req, res) => {
    const id = req.params.id
    const status = req.params.status

    // Verificando se o id que foi passado como parâmetro é realmente um número
    if (isNaN(parseInt(id)) || id == null){
        return res.status(400).json(`Id: ${id} é Inválido`)
    }

    // Recebendo as informações da subtarefa
    const dados_tarefa = await cliente
                                    .query('SELECT * FROM subTarefas WHERE id = $1', [id])
                                    .catch(e => {                                        
                                        return res.status(400).json(e)
                                    })

    // Se o id for válido mas não existir nenhuma subtarefa com esse id, as resposta de dados_tarefas terá rowCount == 0, e retornamos um erro
    if(dados_tarefa.rowCount == 0){
        return res.status(404).json(`SubTarefa '${id}' não encontrada!`)
    }

    // Mundando o status da tarefa e garantindo que a sua data de finalização está nula
    cliente
        .query(`UPDATE subtarefas SET status = $1, data_conclusao = $2 WHERE id = $3`, [status, null ,id])
        .catch(e => {            
            return res.status(400).json(e)
        })
   
    // Se a tarefa estiver sendo finalizado, temos que gravar a data de finalização:
    if (status === 'Concluido'){
        cliente
            .query(`UPDATE subTarefas SET data_conclusao = CURRENT_DATE WHERE id = $1`, [id])
            .catch(e => {                
                return res.status(400).json(e)
            })
    }

    return res.json('Status Atualizado')
})


module.exports = tarefas