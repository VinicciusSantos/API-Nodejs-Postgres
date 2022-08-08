const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Inserindo projetos
projetos.post('/projetos', async (req, res) => { 
    const body = req.body

    // Verificando se os valores estão sendo recebidos no body
    if (body.pr_nome == null) {
        return res.status(400).json(`Valor nulo passado como parâmetro de pr_nome`)
    }

    // recebendo a quantidadde de projetos que tem o mesmo nome do que foi passado no body pra fazer as validações
<<<<<<< HEAD
    const count = await cliente
                                .query('SELECT pr_nome from projetos where pr_nome ilike $1', [body.pr_nome])
                                .catch(e => {
                                    
                                    return res.status(400).json(e)
                                })
    
    // Verificando se já existe algum projeto com o mesmo nome do que vai ser inserido
    if (count.rowCount == 0){
        cliente
            .query(`INSERT INTO projetos (pr_nome, pr_descricao, pr_data_criacao, pr_status)
                    VALUES ($1, $2, current_date, $3)`, [body.pr_nome, body.pr_descricao, 'Ativo'])
            .catch(e => {
                
                return res.status(400).json(e)
            })
=======
    const count = await cliente.query('SELECT pr_nome from projetos where pr_nome ilike $1', [body.pr_nome])
    
    // Verificando se já existe algum projeto com o mesmo nome do que vai ser inserido
    if (count.rowCount == 0){
        cliente.query(`INSERT INTO projetos (pr_nome, pr_descricao, pr_data_criacao, pr_status)
                       VALUES ($1, $2, current_date, $3)`, [body.pr_nome, body.pr_descricao, 'Ativo'])
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
                       
        // Pegando o id do projeto que acabou de ser cadastrado
        const id = await cliente.query('select max(pr_id) from projetos')
        
        // Colocando as equipes no projeto
        if (body.equipes) {
            body.equipes.forEach(async e => {
                const idEquipe = await cliente.query(`select eq_id from equipes where eq_nome = $1`, [e])
<<<<<<< HEAD
                cliente
                    .query(`INSERT INTO projetos_posssuem_equipes (fk_equipe, fk_projeto)
                            VALUES ($1, $2)`, [idEquipe.rows[0].eq_id, id.rows[0].max])
                    .catch(e => {
                        
                        return res.status(400).json(e)
                    })
=======
                cliente.query(`INSERT INTO projetos_posssuem_equipes (fk_equipe, fk_projeto)
                VALUES ($1, $2)`, [idEquipe.rows[0].eq_id, id.rows[0].max])
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
            })
        }
        
        return res.status(201).json("Inserido com sucesso!")
    }
    
    return res.status(409).json("Esse projeto já foi inserido!")
})

module.exports = projetos