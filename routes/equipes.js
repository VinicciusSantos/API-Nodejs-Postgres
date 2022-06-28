const express = require('express')
const equipes = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todas as equipes
equipes.get('/equipes', (req, res) => { 
    cliente
        .query("SELECT * FROM equipes ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando equipes específicas pelo ID
equipes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE id = $1', [id])
        .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo equipes
equipes.post('/equipes', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO equipes (nome, fk_projetos, fk_lider) values ($1, $2, $3)', [body.nome, body.fk_projetos, body.fk_lider])
    return res.json("Inserido com sucesso!")
})

// Deletando equipes
equipes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM equipes WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando equipes
equipes.put('/equipes/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE equipes SET nome = $1, fk_projetos = $2, fk_lider = $3 WHERE id = $4', [body.nome, body.fk_projetos, body.fk_lider, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar as pessoas de uma equipe
equipes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT ppe.fk_pessoas, pe.nome, pe.profissao, pe.data_nasc FROM pertencem_pessoas_equipes as ppe
                INNER JOIN pessoas as pe on ppe.fk_pessoas = pe.id
                WHERE ppe.fk_equipes = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

module.exports = equipes