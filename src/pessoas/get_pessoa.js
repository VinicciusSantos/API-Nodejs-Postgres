const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

// Mostrando pessoas com um ID específico
pessoas.get("/pessoas/:id", async (req, res) => {
    const id = req.params.id;

    const data_pessoas = await cliente.query(
        `SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, pe.pe_salario, pe.pe_data_nasc, pe.pe_status
        FROM pessoas AS pe              
        WHERE pe.pe_id = $1`,[id])
        
    let results = {
        dados: data_pessoas.rows[0],
        tarefas: {
            EmDesenvolvimento: [],
            Concluidas: [],
            NaoIniciadas: []
        },
        projetos: [],
    };

    const tarefas = await cliente.query(
        `SELECT tr.* FROM pessoas AS pe
        INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
        INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
        WHERE pe.pe_id = $1
        ORDER BY tr.tr_prioridade, tr.tr_nome`, [id] );

    const projetos = await cliente.query(
        `SELECT pr.pr_id, pr.pr_nome, pr.pr_descricao, pr.pr_status, pr.pr_data_criacao, pr.pr_data_finalizacao FROM projetos AS pr
        INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
        INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
        INNER JOIN pessoas_pertencem_equipes AS ppeq ON ppeq.fk_equipe = eq.eq_id
        INNER JOIN pessoas AS pe ON pe.pe_id = ppeq.fk_pessoa
        WHERE pe.pe_id = $1`, [id]);

    results.tarefas.EmDesenvolvimento = tarefas.rows.filter((t) => t.tr_status == "Em Desenvolvimento")
    results.tarefas.Concluidas = tarefas.rows.filter((t) => t.tr_status == "Concluidas")
    results.tarefas.NaoIniciadas = tarefas.rows.filter((t) => t.tr_status == "Não Iniciado")
    results.projetos = projetos.rows

    return res.json(results)
});

module.exports = pessoas;