const express = require('express')
const cargos = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todas as atualizações
cargos.get('/cargos', (req, res) => { 
    cliente
        .query(`SELECT * FROM cargos ORDER BY ca_id`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tuma atualizacao especifica
cargos.get('/cargos/:id', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT * FROM cargos WHERE ca_id = $1`, [id])
        .then(results => {
        return res.json(results.rows[0])
    })
})

// Mostrando todas as atualizações de um projeto
cargos.get('/cargos/projeto/:id', (req, res) => { 
    cliente
        .query(``)
        .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo Atualizações
cargos.post('/cargos', (req, res) => { 
    const body = req.body

    cliente.query(`INSERT INTO cargos (att_mensagem, fk_projeto, fk_autor) VALUES ($1, $2, $3)`, [body.att_mensagem, body.fk_projeto, body.fk_autor])
    return res.json("Atualização Inserida com sucesso!")
})

module.exports = cargos
