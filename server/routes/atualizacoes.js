const express = require('express')
const atualizacoes = express.Router()
var cliente = require('../database/connection.js')

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
        return res.json(results.rows[0])
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

//Inserindo Atualizações
atualizacoes.post('/atualizacoes', (req, res) => { 
    const body = req.body

    cliente.query(`INSERT INTO atualizacoes (att_mensagem, fk_projeto, fk_autor) VALUES ($1, $2, $3)`, [body.att_mensagem, body.fk_projeto, body.fk_autor])
    return res.json("Atualização Inserida com sucesso!")
})

module.exports = atualizacoes
