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
    cliente.query('SELECT * FROM projetos WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo projetos
routes.post('/projetos', (req, res) => { 
    const body = req.body

    cliente.connect()
    cliente.query('INSERT INTO projetos (nome) values ($1)', [body.nome])
    .then(results => {
        return res.json("Inserido com sucesso!")
    })
})

// Deletando projetos
routes.delete('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('DELETE FROM projetos WHERE id = $1', [id])
    .then(results => {
        return res.json("Deletado com sucesso!")
    })
})


// Editando projetos
routes.put('/projetos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.connect()
    cliente.query('UPDATE projetos SET nome = $1 WHERE id = $2', [body.nome, id])
    .then(results => {
        return res.json("Alterado com sucesso!")
    })
})

/* ------------------------------ Equipes ------------------------------ */

// Mostrando todas as equipes
routes.get('/equipes', (req, res) => { 
    cliente.connect()
    cliente.query("SELECT * FROM equipes")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando equipes específicas pelo ID
routes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('SELECT * FROM equipes WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo equipes
routes.post('/equipes', (req, res) => { 
    const body = req.body

    cliente.connect()
    cliente.query('INSERT INTO equipes (nome, projetos) values ($1, $2)', [body.nome, body.projetos])
    .then(results => {
        return res.json("Inserido com sucesso!")
    })
})

// Deletando equipes
routes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('DELETE FROM equipes WHERE id = $1', [id])
    .then(results => {
        return res.json("Deletado com sucesso!")
    })
})

// Editando equipes
routes.put('/equipes/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.connect()
    cliente.query('UPDATE equipes SET nome = $1, projetos = $2 WHERE id = $3', [body.nome, body.projetos, id])
    .then(results => {
        return res.json("Alterado com sucesso!")
    })
})

/* ------------------------------ Tarefas ------------------------------ */

// Mostrando todas as tarefas
routes.get('/tarefas', (req, res) => { 
    cliente.connect()
    cliente.query("SELECT * FROM tarefas")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tarefas pelo ID
routes.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('SELECT * FROM tarefas WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})
// Inserindo tarefas
routes.post('/tarefass', (req, res) => { 
    const body = req.body

    cliente.connect()
    cliente.query('INSERT INTO tarefas (nome, descricao) values ($1, $2)', [body.nome, body.descricao])
    .then(results => {
        return res.json("Inserido com sucesso!")
    })
})

// Deletando tarefas
routes.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente.connect()
    cliente.query('DELETE FROM tarefas WHERE id = $1', [id])
    .then(results => {
        return res.json("Deletado com sucesso!")
    })
})

// Editando tarefas
routes.put('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.connect()
    cliente.query('UPDATE tarefas SET nome = $1, descricao = $2  WHERE id = $3', [body.nome, body.descricao, id])
    .then(results => {
        return res.json("Alterado com sucesso!")
    })
})


/* --------------------- Rotas Relacionadas com a interação de duas listas --------------------- */

// Mostar as pessoas de uma equipe

// Mostrar tarefas de uma equipe

// Mostar tarefa de uma pessoa

// Mostrar equipes de um projeto

// Mostrar pessoas com uma mesma tarefa

cliente.end()
module.exports = routes
