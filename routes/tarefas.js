const express = require('express')
const tarefas = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todas as tarefas
tarefas.get('/tarefas', (req, res) => { 
    cliente
        .query(`SELECT * FROM tarefas ORDER BY tr_id`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Quantidade de tarefas
tarefas.get('/tarefas/count', (req, res) => { 
    cliente
        .query(`select count(*) from tarefas`)
        .then(results => {
        return res.json(results.rows[0])
    })
})

// Mostrando todos os Status que estão sendo utilizados
tarefas.get('/tarefas/status', (req, res) => {
    cliente
        .query(`SELECT tr_status, count(*) FROM tarefas GROUP BY tr_status`)
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrando tarefas pelo ID
tarefas.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT * FROM tarefas WHERE tr_id = $1`, [id])
        .then(results => {
        return res.json(results.rows[0])
    })
})

//Inserindo Tarefas
tarefas.post('/tarefas', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO tarefas (tr_nome, tr_descricao, tr_data_criacao, tr_status) values ($1, $2, $3, $4)', [body.nome, body.descricao, body.data_criacao, 'Ativo'])
    return res.json("Inserido com sucesso!")
})

// Deletando tarefas
tarefas.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    cliente.query('DELETE FROM tarefas WHERE tr_id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando tarefas
tarefas.put('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE tarefas SET tr_nome = $1, tr_descricao = $2, tr_data_criacao = $3  WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar pessoas com uma mesma tarefa
tarefas.get('/tarefas/:id/pessoas', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT tr.tr_id, tr.tr_nome, pe.pe_id, pe.pe_nome FROM tarefas AS tr
                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_tarefa = tr.tr_id
                INNER JOIN pessoas AS pe ON pe.pe_id = pat.fk_pessoa
                WHERE tr.tr_id = $1`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tarefas com um status específico
tarefas.get('/tarefas/status/:status', (req, res) => {
    const status = req.params.status

    cliente
        .query(`SELECT * FROM tarefas
                WHERE tr_status = $1`, [status])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mudar Status de uma pessoa
tarefas.put('/tarefas/:id/status/:status', (req, res) => {
    const id = req.params.id
    const status = req.params.status

    // Mundando o status de uma pessoa
    cliente.query(`UPDATE tarefas SET tr_status = $1 WHERE tr_id = $2`, [status, id])
    return res.json('Status Atualizado')
})

module.exports = tarefas