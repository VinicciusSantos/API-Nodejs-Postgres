const express = require('express')
const atualizacoes = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todas as atualizações
atualizacoes.get('/atualizacoes', (req, res) => { 
    cliente
        .query(`SELECT * FROM atualizacoes ORDER BY att_id`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tuma atualizacao especifica
atualizacoes.get('/atualizacoes/:id', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT * FROM atualizacoes WHERE att_id = $1`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando todas as atualizações de um projeto
atualizacoes.get('/atualizacoes/projeto/:id', (req, res) => { 
    cliente
        .query(``)
        .then(results => {
        return res.json(results.rows)
    })
})


//Inserindo Tarefas
atualizacoes.post('/atualizacoes', (req, res) => { 
    const body = req.body

    cliente.query(`INSERT INTO atualizacoes (att_mensagem, fk_projeto, fk_autor) VALUES ($1, $2, $3)`, [body.att_mensagem, body.fk_projeto, body.fk_autor])
    return res.json("Atualização Inserida com sucesso!")
})

module.exports = atualizacoes
