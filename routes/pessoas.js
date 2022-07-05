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
        .query(`SELECT pe.pe_id, pe.pe_nome, ca.ca_cargo, pe.pe_data_nasc, pe.pe_status, pe.pe_qtd_tarefas_finalizadas
                FROM pessoas AS pe
                INNER JOIN cargos AS ca ON ca.ca_id = pe.pe_fk_cargo                
                ORDER BY pe_id`)
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

// Mostrando todos os Status que estão sendo utilizados
pessoas.get('/pessoas/status', (req, res) => {
    cliente
        .query(`SELECT pe_status, count(*) FROM pessoas GROUP BY pe_status`)
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrando pessoas com um ID específico
pessoas.get('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, ca.ca_cargo, pe.pe_data_nasc, pe.pe_status, pe.pe_qtd_tarefas_finalizadas
                FROM pessoas AS pe
                INNER JOIN cargos AS ca ON ca.ca_id = pe.pe_fk_cargo                
                WHERE pe.pe_id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
    })
})

// Inserindo pessoas
pessoas.post('/pessoas', (req, res) => { 
    const body = req.body

    cliente
        .query(`INSERT INTO pessoas (pe_nome, pe_fk_cargo
        , pe_data_nasc, pe_status, pe_qtd_tarefas_finalizadas)
                VALUES ($1, $2, $3, $4, $5)`, [body.nome, body.pe_fk_cargo
                , body.data_nasc, 'Ativo', 0])
        .then(results => {
            return res.json("Inserido com sucesso!")
        })
})

// Deletando pessoas
pessoas.delete('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('DELETE FROM pessoas WHERE pe_id = $1', [id])
        .then(results => {
            return res.json("Deletado com sucesso!")
        })
})

// Editando pessoas
pessoas.put('/pessoas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente
        .query(`UPDATE pessoas SET nome = $1, pe_fk_cargo         = $2, data_nasc = $3
                WHERE pe_id = $4`, [body.nome, body.pe_fk_cargo
                , body.data_nasc ,id])
        .then(results => {
            return res.json("Alterado com sucesso!")
        })
})

// Mostrar tarefas de uma pessoa
pessoas.get('/pessoas/:id/tarefas', (req, res) => { 
    const id = req.params.id>
    
    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, tr.tr_id, tr.tr_nome FROM pessoas AS pe
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                WHERE pe.pe_id = $1`, [id])
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

// Mostrando pessoas com um status específico
pessoas.get('/pessoas/status/:status', (req, res) => {
    const status = req.params.status

    cliente
        .query(`SELECT * FROM pessoas
                WHERE pe_status = $1`, [status])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mudar Status de uma pessoa
pessoas.put('/pessoas/:id/status/:status', (req, res) => {
    const id = req.params.id
    const status = req.params.status

    // Mundando o status de uma pessoa
    cliente.query(`UPDATE pessoas SET pe_status = $1 WHERE pe_id = $2`, [status, id])
    return res.json('Status Atualizado')
})

module.exports = pessoas