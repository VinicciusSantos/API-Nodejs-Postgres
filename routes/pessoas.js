const express = require('express')
const pessoas = express.Router()

const { Client } = require('pg');

const cliente = new Client({
    connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
    ssl: {
        rejectUnauthorized: false
    }
})

cliente.connect()

// Mostrando todas as pessoas
pessoas.get('/pessoas', (req, res) => { 
    cliente
        .query(`SELECT pe.id, pe.nome, ca.cargo, pe.data_nasc, pe.status, pe.qtd_tarefas_finalizadas
                FROM pessoas AS pe
                INNER JOIN cargos AS ca ON ca.id = pe.fk_cargo
                ORDER BY id`)
        .then(results => {
            return res.json(results.rows)
    })
})

pessoas.get('/pessoas/count', (req, res) => { 
    cliente
        .query("select count(*) from pessoas")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando pessoas com um ID específico
pessoas.get('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.id, pe.nome, ca.cargo, pe.data_nasc, pe.status, pe.qtd_tarefas_finalizadas
                FROM pessoas AS pe
                INNER JOIN cargos AS ca ON ca.id = pe.fk_cargo
                WHERE pe.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
    })
})

// Inserindo pessoas
pessoas.post('/pessoas', (req, res) => { 
    const body = req.body

    cliente
        .query(`INSERT INTO pessoas (nome, fk_cargo, data_nasc, status, qtd_tarefas_finalizadas)
                VALUES ($1, $2, $3, $4, $5)`, [body.nome, body.fk_cargo, body.data_nasc, 'Ativo', 0])
        .then(results => {
            return res.json("Inserido com sucesso!")
        })
})

// Deletando pessoas
pessoas.delete('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('DELETE FROM pessoas WHERE id = $1', [id])
        .then(results => {
            return res.json("Deletado com sucesso!")
        })
})

// Editando pessoas
pessoas.put('/pessoas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente
        .query(`UPDATE pessoas SET nome = $1, fk_cargo = $2, data_nasc = $3
                WHERE id = $4`, [body.nome, body.fk_cargo, body.data_nasc ,id])
        .then(results => {
            return res.json("Alterado com sucesso!")
        })
})

// Mostrar tarefas de uma pessoa
pessoas.get('/pessoas/:id/tarefas', (req, res) => { 
    const id = req.params.id
    
    cliente
        .query(`SELECT pe.id, pe.nome, tr.id, tr.nome FROM pessoas AS pe
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.id
                INNER JOIN tarefas AS tr ON tr.id = pat.fk_tarefa
                WHERE pe.id = $1`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Associar Tarefas com Pessoas
pessoas.post('/pessoas/:id_pessoa/tarefas/:id_tarefa', (req, res) => { 
    const id_pessoa = req.params.id_pessoa
    const id_tarefa = req.params.id_tarefa

    cliente    
        .query(`INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa)
                VALUES ($1, $2)`, [id_pessoa, id_tarefa])
        .then(r => {
            return res.json("Tarefa inserida no projeto")
        })
})

module.exports = pessoas