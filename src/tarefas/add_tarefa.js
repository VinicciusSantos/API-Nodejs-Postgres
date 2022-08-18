const express = require('express')
const tarefas = express.Router()
var cliente = require('../../cmd/database/connection.js')

//Inserindo Tarefas
tarefas.post('/tarefas', async (req, res) => { 
    const body = req.body

    if (body.tr_nome === "" || !body.tr_nome) {
        return res.status(400).json('Nome Inválido')
    }

    // recebendo a quantidadde de tarefas que tem o mesmo nome do que foi passado no body pra fazer as validações
    const count = await cliente.query('SELECT count(*) from tarefas where tr_nome ilike $1', [body.tr_nome])
    
    if (count.rows[0].count != 0) {
        return res.status(404).json("Uma tarefa com esse nome já foi inserida")
    }

    // Inserindo a tarefa
    const results = await cliente.query(`INSERT INTO tarefas (tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_prioridade)
                                    VALUES ($1, $2, current_date, 'Não Iniciado', $3)`, [body.tr_nome, body.tr_descricao, body.tr_prioridade])
    
    // Pegando o id da tarefa que acabou de ser cadastrada
    const id = await cliente.query('select max(tr_id) from tarefas')
    
    if (body.pr_id) {
        // Associando a tarefa com o projeto
        const projetoTarefa = await cliente.query(`INSERT INTO projetos_possuem_tarefas (fk_projeto, fk_tarefa)
                                                    VALUES ($1, $2)`, [body.pr_id, id.rows[0].max])
    }
    
    
    if (body.pessoas) {   
        // Associando as pessoas com as tarefas
        body.pessoas.forEach(async p => {
            cliente.query(`INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa)
            VALUES ($1, $2)`, [p.pe_id, id.rows[0].max])
        })
    }

    return res.status(200).json(`Deu Certo`)
})

module.exports = tarefas