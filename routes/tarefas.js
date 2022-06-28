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
        .query("SELECT * FROM tarefas ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo Tarefas
tarefas.post('/tarefas', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO tarefas (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    return res.json("Inserido com sucesso!")
})

// Mostrando tarefas pelo ID
tarefas.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM tarefas WHERE id = $1', [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Deletando tarefas
tarefas.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    cliente.query('DELETE FROM tarefas WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando tarefas
tarefas.put('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE tarefas SET nome = $1, descricao = $2, data_criacao = $3  WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar pessoas com uma mesma tarefa
tarefas.get('/tarefas/:id/pessoas', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT tr.id, tr.nome, pe.id, pe.nome, pe.profissao from tarefas as tr
                INNER JOIN possuem_projetos_tarefas AS ppt ON ppt.fk_tarefas = tr.id
                INNER JOIN recebem_tarefas_pessoas AS rtp ON rtp.fk_pert_pess_tar = ppt.fk_tarefas
                INNER JOIN pessoas AS pe ON pe.id = rtp.fk_pessoas
                WHERE tr.id = $1
                ORDER BY tr.id, pe.id`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

module.exports = tarefas