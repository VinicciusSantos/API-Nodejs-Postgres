const express = require("express");
const pessoas = express.Router();
var cliente = require("../database/connection.js");

// Mostrando todas as pessoas
pessoas.get("/pessoas", (req, res) => {
    cliente
        .query(
            `SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, pe.pe_salario, pe.pe_data_nasc, pe.pe_status
                FROM pessoas AS pe              
                ORDER BY pe_id`
        )
        .then((results) => {
            return res.json(results.rows);
        });
});

pessoas.get("/pessoas/count", (req, res) => {
    cliente.query("select count(*) from pessoas").then((results) => {
        return res.json(results.rows[0]);
    });
});

// Mostrando todos os Status que estão sendo utilizados
pessoas.get("/pessoas/status", (req, res) => {
    cliente
        .query(`SELECT pe_status, count(*) FROM pessoas GROUP BY pe_status`)
        .then((results) => {
            return res.json(results.rows);
        });
});

// Mostrando pessoas com um ID específico
pessoas.get("/pessoas/:id", (req, res) => {
    const id = req.params.id;

    cliente
        .query(
            `SELECT pe.pe_id, pe.pe_nome, pe.pe_cargo, pe.pe_salario, pe.pe_data_nasc, pe.pe_status
                FROM pessoas AS pe              
                WHERE pe.pe_id = $1`,
            [id]
        )
        .then((results) => {
            return res.json(results.rows[0]);
        });
});

// Inserindo pessoas
pessoas.post("/pessoas", (req, res) => {
    const body = req.body;
    cliente
        .query(
            `INSERT INTO pessoas (pe_nome, pe_cargo, pe_salario, pe_data_nasc, pe_status)
                VALUES ($1, $2, $3, $4, $5)`,
            [
                body.pe_nome,
                body.pe_cargo,
                body.pe_salario,
                body.pe_data_nasc,
                "Não Iniciado",
            ]
        )
        .then((results) => {
            return res.json("Inserido com sucesso!");
        });
});

// Deletando pessoas
pessoas.delete("/pessoas/:id", (req, res) => {
    const id = req.params.id;

    cliente
        .query("DELETE FROM pessoas WHERE pe_id = $1", [id])
        .then((results) => {
            return res.json("Deletado com sucesso!");
        });
});

// Editando pessoas
pessoas.put("/pessoas/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    cliente
        .query(
            `UPDATE pessoas SET pe_nome = $1, pe_data_nasc = $2, pe_cargo = $3, pe_salario = $4
                WHERE pe_id = $5`,
            [body.pe_nome, body.pe_data_nasc, body.pe_cargo, body.pe_salario, id]
        )
        .then((results) => {
            return res.json("Alterado com sucesso!");
        });
});

// Mostrar tarefas de uma pessoa
pessoas.get("/pessoas/:id/atividades", async (req, res) => {
    const id = req.params.id;

    let results = {
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
        `SELECT * FROM projetos AS pr
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

// Associar Tarefas com Pessoas
pessoas.post("/pessoas/:id_pessoa/tarefas/:id_tarefa", (req, res) => {
    const id_pessoa = req.params.id_pessoa;
    const id_tarefa = req.params.id_tarefa;

    cliente
        .query(
            `INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa)
                VALUES ($1, $2)`,
            [id_pessoa, id_tarefa]
        )
        .then((r) => {
            return res.json("Tarefa inserida no projeto");
        });
});

// Mostrando pessoas com um status específico
pessoas.get("/pessoas/status/:status", (req, res) => {
    const status = req.params.status;

    cliente
        .query(
            `SELECT * FROM pessoas
                WHERE pe_status = $1`,
            [status]
        )
        .then((results) => {
            return res.json(results.rows);
        });
});

// Mudar Status de uma pessoa
pessoas.put("/pessoas/:id/status/:status", (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    // Mundando o status de uma pessoa
    cliente.query(`UPDATE pessoas SET pe_status = $1 WHERE pe_id = $2`, [
        status,
        id,
    ]);
    return res.json("Status Atualizado");
});

module.exports = pessoas;
