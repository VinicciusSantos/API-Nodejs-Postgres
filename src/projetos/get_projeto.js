const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')


// Mostrando projetos pelo ID
projetos.get('/projetos/:id', async (req, res) => { 
    const id = req.params.id

    // Recebendo as informações do projeto
    const dados_projeto = await cliente.query('SELECT * FROM projetos WHERE pr_id = $1', [id])
                                       .catch(e => console.log(e.stack))

    // Se o id for válido mas não existir nenhum projeto com esse id, as resposta de dados_projeto terá rowCount == 0, e retornamos um erro
    if(dados_projeto.rowCount == 0){
        return res.status(404).json(`Projeto '${id}' não encontrado!`)
    }

    // Recebendo as tarefas do projeto
    const lista_tarefas = await cliente.query(`SELECT tr.tr_id, tr.tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_data_finalizacao FROM projetos AS pr
                                               INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.pr_id
                                               INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                                               WHERE pr.pr_id = $1`, [id])

    // Recebendo as equipes do projeto
    const lista_equipes = await cliente.query(`SELECT eq.eq_id, eq.eq_nome FROM projetos AS pr
                                               INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
                                               INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                                               WHERE pr.pr_id = $1
                                               ORDER BY pr.pr_id, eq.eq_id`, [id])

    const lista_pessoas = await cliente.query(`SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, pe.pe_salario, eq.eq_nome ,eq.eq_id FROM pessoas AS pe
                                               INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.pe_id
                                               INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                                               ORDER BY pe.pe_id`)

    // Montando um objeto para ser retornado no json
    let results = {
        dados: dados_projeto.rows[0],
        equipes: lista_equipes.rows,
        tarefas: lista_tarefas.rows
    }

    // Buscando as pessoas de cada equipe do projeto
    for (let j = 0; j < lista_equipes.rowCount; j++) {
        results.equipes[j].pessoas = lista_pessoas.rows.filter(item => item.eq_id == lista_equipes.rows[j].eq_id) 
    }

    return res.status(200).json(results)
})

module.exports = projetos