const express = require('express')
const routes = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
});

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Menu Principal, Acesse: https://github.com/VinicciusSantos/API-NodeJs para saber mais`)
})

/* ------------------------------ Pessoas ------------------------------ */

// Mostrando todas as pessoas

// Mostrando pessoas com um ID específico

// Inserindo pessoas

// Deletando pessoas

// Editando pessoas


/* ------------------------------ Projetos ------------------------------ */

// Mostrando todos os Projetos
routes.get('/projetos', (req, res) => { 
    cliente.connect()
    cliente.query("SELECT * FROM projetos")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando projetos pelo ID
routes.get('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('select * from blog.post where id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo projetos

// Deletando projetos

// Editando projetos


/* ------------------------------ Equipes ------------------------------ */

// Mostrando todas as equipes

// Mostrando equipes específicas pelo ID

// Deletando equipes

// Editando equipes


/* ------------------------------ Tarefas ------------------------------ */

// Mostrando todas as tarefas

// Mostrando tarefas com um ID específico

// Inserindo tarefas

// Deletando tarefas


/* --------------------- Rotas Relacionadas com a interação de duas listas --------------------- */

// Mostar as pessoas de uma equipe

// Mostrar tarefas de uma equipe

// Mostar tarefa de uma pessoa

// Mostrar equipes de um projeto

// Mostrar pessoas com uma mesma tarefa

cliente.end()
module.exports = routes
