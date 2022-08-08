const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mudar Status de uma tarefa
tarefas.put('/tarefas/:id/status/:status', async (req, res) => {
    const id = req.params.id
    const status = req.params.status

    // Verificando se o id que foi passado como parâmetro é realmente um número
    if (isNaN(parseInt(id)) || id == null){
        return res.status(400).json(`Id: ${id} é Inválido`)
    }

    // Recebendo as informações da tarefa
    const dados_tarefa = await cliente
                                    .query('SELECT * FROM tarefas WHERE tr_id = $1', [id])
                                    .catch(e => {
                                        
                                        return res.status(400).json(e)
                                    })

    // Se o id for válido mas não existir nenhuma tarefa com esse id, as resposta de dados_tarefas terá rowCount == 0, e retornamos um erro
    if(dados_tarefa.rowCount == 0){
        return res.status(404).json(`Tarefa '${id}' não encontrada!`)
    }

    // Mundando o status da tarefa e garantindo que a sua data de finalização está nula
    cliente
        .query(`UPDATE tarefas SET tr_status = $1, tr_data_finalizacao = $2 WHERE tr_id = $3`, [status, null ,id])
        .catch(e => {
            
            return res.status(400).json(e)
        })
   
    // Se a tarefa estiver sendo finalizado, temos que gravar a data de finalização:
    if (status === 'Concluido'){
        cliente
            .query(`UPDATE tarefas SET tr_data_finalizacao = CURRENT_DATE WHERE tr_id = $1`, [id])
            .catch(e => {
                
                return res.status(400).json(e)
            })
    }

    return res.json('Status Atualizado')
})


module.exports = tarefas