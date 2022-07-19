const express = require('express')
const cargos = express.Router()

var cliente = require('../database/connection.js')

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

//Inserindo cargos
cargos.post('/cargos', (req, res) => { 
    const body = req.body

    cliente
        .query('INSERT INTO cargos (ca_cargo, ca_salario) values ($1, $2)', [body.ca_cargo, body.ca_salario])
    return res.json("Inserido com sucesso!")
})

// Deletando cargos
cargos.delete('/cargos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM cargos WHERE ca_id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando cargos
cargos.put('/cargos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE cargos SET ca_cargo = $1, ca_salario = $2 WHERE ca_id = $3', [body.ca_cargo, body.ca_salario, id])
    return res.json("Alterado com sucesso!")
})

module.exports = cargos