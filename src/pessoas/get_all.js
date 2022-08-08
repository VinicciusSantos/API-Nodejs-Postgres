const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");

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
<<<<<<< HEAD
        })
        .catch(e => {
            
            return res.status(400).json(e)
        })
=======
        });

        // const projetos = await cliente.query(`select * fom projetos`)
        // const projetosEquipes = await cliente.query(`select * fom projetos_posssuem_equipes`)
        // const equipes = await cliente.query(`select * fom equipes`)
        // const pessoasEquipes = await cliente.query(`select * fom pessoas_pertencem_equipes`)
        // const pessoas = await cliente.query(`select * fom pessoas`)
        // const pessoasTarefas = await cliente.query(`select * fom pessoas_associam_tarefas`)
        // const tarefas = await cliente.query(`select * fom tarefas`)
    
        // results = {
        //     dados: 
        // }
    
        // pessoas.rows.forEach(element => {
            
        // });
>>>>>>> parent of ee26479 (Tratamento de erros com Catch)
});

module.exports = pessoas;