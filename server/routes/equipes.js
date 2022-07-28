const express = require('express')
const equipes = express.Router()
var cliente = require('../database/connection.js')

// Mostrando todas as equipes
equipes.get('/equipes', (req, res) => { 
    cliente
        .query(`SELECT * from equipes`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Quantidade de equipes
equipes.get('/equipes/count', (req, res) => { 
    cliente
        .query("select count(*) from equipes")
        .then(results => {
        return res.json(results.rows[0])
    })
})

// Mostrando equipes específicas pelo ID
equipes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE eq_id = $1', [id])
        .then(results => {
        return res.json(results.rows[0])
    })
})

//Inserindo equipes
equipes.post('/equipes', (req, res) => { 
    const body = req.body

    cliente
        .query('INSERT INTO equipes (eq_nome) values ($1)', [body.eq_nome])
    return res.json("Inserido com sucesso!")
})

// Deletando equipes
equipes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM equipes WHERE eq_id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando equipes
equipes.put('/equipes/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE equipes SET eq_nome = $1 WHERE eq_id = $2', [body.eq_nome, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar as pessoas de uma equipe
equipes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, ca.ca_cargo, eq.eq_nome FROM pessoas AS pe
                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.pe_id
                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                INNER JOIN cargos AS ca ON ca.ca_id = pe.pe_fk_cargo
                WHERE eq.eq_id = $1`, [id])
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

// Associar Pessoa com Equipe
equipes.post('/equipes/:id_equipe/pessoas/:id_pessoa', (req, res) => { 
    const id_equipe = req.params.id_equipe
    const id_pessoa = req.params.id_pessoa

    cliente.query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoas, fk_equipes)
                   VALUES ($1, $2)`, [id_pessoa, id_equipe])

    return res.json("Pessoa Inserida na Equipe")
})

module.exports = equipes