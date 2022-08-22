const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Inserindo projetos
projetos.post('/projetos', authenticateToken, async (req, res) => { 
    const body = req.body

    if (body.pr_nome === "" || !body.pr_nome) {
        return res.status(400).json('Nome Inválido')
    }
    

    // recebendo a quantidadde de projetos que tem o mesmo nome do que foi passado no body pra fazer as validações
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
                       
        // Pegando o id do projeto que acabou de ser cadastrado
        const id = await cliente.query('select max(pr_id) from projetos')
        
        // Colocando as equipes no projeto
        if (body.equipes) {
            body.equipes.forEach(async e => {
                cliente
                    .query(`INSERT INTO projetos_posssuem_equipes (fk_equipe, fk_projeto)
                            VALUES ($1, $2)`, [e.eq_id, id.rows[0].max])
                    .catch(e => {                       
                        return res.status(400).json(e)
                    })
            })
        }
        
        return res.status(201).json("Inserido com sucesso!")
    }
    
    return res.status(409).json("Esse projeto já foi inserido!")
})

module.exports = projetos