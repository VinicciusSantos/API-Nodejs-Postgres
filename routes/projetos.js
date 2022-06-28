const express = require('express')
const projetos = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todos os Projetos
projetos.get('/projetos', (req, res) => { 
    cliente
        .query("SELECT * FROM projetos ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando projetos pelo ID
projetos.get('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM projetos WHERE id = $1', [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo projetos
projetos.post('/projetos', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO projetos (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    return res.json("Inserido com sucesso!")
})

// Deletando projetos
projetos.delete('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM projetos WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando projetos
projetos.put('/projetos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE projetos SET nome = $1, descricao = $2, data_criacao = $3 WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar pessoas de um projeto
projetos.get('/projetos/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pj.id, pj.nome, pe.id, pe.nome FROM pessoas AS pe
                   INNER JOIN pertencem_pessoas_equipes AS ppe ON ppe.fk_pessoas = pe.id
                   INNER JOIN equipes AS eq ON eq.id = ppe.fk_equipes
                   INNER JOIN projetos AS PJ ON pj.id = eq.fk_projetos
                   WHERE pj.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar tarefas de um projeto
projetos.get('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT ppt.id, pr.nome, tr.nome FROM possuem_projetos_tarefas as ppt
                INNER JOIN projetos as pr on ppt.fk_projetos = pr.id
                INNER JOIN tarefas as tr on ppt.fk_tarefas = tr.id
                WHERE pr.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar equipes de um projeto
projetos.get('/projetos/:id/equipes', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE fk_projetos = $1', [id])
        .then(results => {
            return res.json(results.rows)
        })
})

module.exports = projetos