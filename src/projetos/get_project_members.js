const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Mostrar pessoas de um projeto
projetos.get('/projetos/:id/pessoas', async (req, res) => { 
    const id = req.params.id

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

    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, eq.eq_nome, pr.pr_nome FROM projetos AS pr
                INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                INNER JOIN pessoas_pertencem_equipes AS epp ON epp.fk_equipe = eq.eq_id
                INNER JOIN pessoas AS pe ON pe.pe_id = epp.fk_pessoa
                WHERE pr.pr_id = $1
                ORDER BY pr.pr_id, eq.eq_id ,pe.pe_id`, [id])
        .then(results => {
            return res.status(200).json(results.rows)
        })
})

module.exports = projetos