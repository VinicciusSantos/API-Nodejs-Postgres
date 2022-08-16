const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Editando projetos
projetos.put('/projetos/:id', async (req, res) => { 
    const id = req.params.id
    const body = req.body

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

    // Editando as informações básicas do projeto
    cliente
        .query('UPDATE projetos SET pr_nome = $1, pr_descricao = $2 WHERE pr_id = $3', [body.pr_nome, body.pr_descricao, id])
        .catch(e => {     
            return res.status(400).json(e)
        })

    // editando as equipes do projeto
    cliente.query(`DELETE FROM projetos_posssuem_equipes WHERE fk_projeto = $1`, [id])
     // Colocando as equipes no projeto

    body.equipes.forEach(async e => {
        cliente
            .query(`INSERT INTO projetos_posssuem_equipes (fk_equipe, fk_projeto)
                    VALUES ($1, $2)`, [e.eq_id, id])
            .catch(e => {                       
                return res.status(400).json(e)
            })
    })
    return res.status(204).json("Alterado com sucesso!")
})

module.exports = projetos