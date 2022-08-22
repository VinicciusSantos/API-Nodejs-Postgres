const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mudar Status de uma tarefa
tarefas.put('/tarefas/:id/status/:status', authenticateToken, async (req, res) => {
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
        await cliente
                .query(`UPDATE tarefas SET tr_data_finalizacao = CURRENT_DATE WHERE tr_id = $1`, [id])
                .catch(e => {                
                    return res.status(400).json(e)
                })  
    }

    // Verificando se o projeto tem todas as tarefas concluidas
    const projeto = await cliente
                        .query(`SELECT * FROM projetos_possuem_tarefas AS ppt
                                INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                                WHERE fk_tarefa = $1`, [id])
                        .catch(e => {                
                            return res.status(400).json(e)
                        })

    if (projeto.rows.filter(t => t.tr_status == 'Concluido').length == 0) {
        // Mudando o status do projeto para concluido se todas as tarefas estiverem concluidas
        await cliente.query(`UPDATE projetos SET pr_status = 'Em Andamento' WHERE pr_id = $1`, [projeto.rows[0].fk_projeto])
    } else {
        // Mudando o status do projeto para Em Andamento
        await cliente.query(`UPDATE projetos SET pr_status = 'Concluido' WHERE pr_id = $1`, [projeto.rows[0].fk_projeto])
    }

    return res.json('Status Atualizado')
})


module.exports = tarefas