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

// Quantidade de equipes
equipes.get('/equipes/count', (req, res) => { 
    cliente
        .query("select count(*) from equipes")
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

    cliente
        .query('INSERT INTO equipes (nome, fk_lider) values ($1, $2)', [body.nome, body.fk_lider])
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

    cliente.query('UPDATE equipes SET nome = $1, fk_lider = $2 WHERE id = $3', [body.nome, body.fk_lider, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar as pessoas de uma equipe
equipes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.id, pe.nome, ca.cargo, eq.nome FROM pessoas AS pe
                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.id
                INNER JOIN equipes AS eq ON eq.id = ppe.fk_equipe
                INNER JOIN cargos AS ca ON ca.id = pe.fk_cargo
                WHERE eq.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Associar Pessoa com Equipe
equipes.post('/equipes/:id_equipe/pessoas/:id_pessoa', (req, res) => { 
    const id_equipe = req.params.id_equipe
    const id_pessoa = req.params.id_pessoa

    cliente.query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoas, fk_equipes)
                   VALUES ($1, $2)`, [id_pessoa, id_equipe])

    return res.json("Pessoa Inserida na Equipe")
})

module.exports = equipes