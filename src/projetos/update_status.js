const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mudar Status de um Projeto
projetos.put('/projetos/:id/status/:status', async (req, res) => {
    const id = req.params.id
    const status = req.params.status
    
    // Verificando se o id que foi passado como parâmetro é realmente um número
    if (isNaN(parseInt(id)) || id == null){
        return res.status(400).json(`Id: ${id} é Inválido`)
    }

    // Recebendo as informações do projeto
    const dados_projeto = await cliente
                                        .query('SELECT * FROM projetos WHERE pr_id = $1', [id])
                                        .catch(e => {
                                            
                                            return res.status(400).json(e)
                                        })

    // Se o id for válido mas não existir nenhum projeto com esse id, as resposta de dados_projeto terá rowCount == 0, e retornamos um erro
    if(dados_projeto.rowCount == 0){
        return res.status(404).json(`Projeto '${id}' não encontrado!`)
    }

    if (status === 'Concluido'){
        // Somente Autoriza a conclusão do projeto se todas as tarefas dele estiverem concluidas
        const tarefas = await cliente
                                    .query(`SELECT tr_id, tr_nome, tr_status FROM projetos AS pr
                                            INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.pr_id
                                            INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                                            WHERE pr_id = $1 AND tr.tr_status != 'Concluido'`, [id])
                                    .catch(e => {
                                        
                                        return res.status(400).json(e)
                                    })

        console.log(tarefas.rowCount)
        
        if (tarefas.rowCount > 0) {
            return res.json({mensagem:'Não foi possível Concluir o Projeto, pois ainda existem tarefas não concluidas:', tarefas:tarefas.rows})
        }
    }

    // Mundando o status do projeto e garantindo que a sua data de finalização está nula
    cliente
            .query(`UPDATE projetos SET pr_status = $1, pr_data_finalizacao = $2 WHERE pr_id = $3`, [status, null ,id])
            .catch(e => {
                
                return res.status(400).json(e)
            })
   
    // Se o projeto estiver sendo finalizado, temos que gravar a data de finalização:
    if (status === 'Concluido'){
        cliente
                .query(`UPDATE projetos SET pr_data_finalizacao = CURRENT_DATE WHERE pr_id = $1`, [id])
                .catch(e => {
                    
                    return res.status(400).json(e)
                })
    }
    
    return res.status(200).json('Status Atualizado')
})

module.exports = projetos