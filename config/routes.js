const express = require('express')
const routes = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})
cliente.connect()

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Menu Principal, Acesse: https://github.com/VinicciusSantos/API-NodeJs para saber mais`)
})

/* ------------------------------ Pessoas ------------------------------ */

// Mostrando todas as pessoas
routes.get('/pessoas', (req, res) => { 
    cliente.query("SELECT * FROM pessoas ORDER BY id")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando pessoas com um ID específico
routes.get('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT * FROM pessoas WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo pessoas
routes.post('/pessoas', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO pessoas (nome, profissao, data_nasc, fk_tarefa) values ($1, $2, $3, $4)', [body.nome, body.profissao, body.data_nasc, body.fk_tarefa])
    return res.json("Inserido com sucesso!")
})

// Deletando pessoas
routes.delete('/pessoas:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM pessoas WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando pessoas
routes.put('/pessoas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE pessoas SET nome = $1, profissao = $2, data_nasc = $3, fk_tarefa = $4 WHERE id = $5', [body.nome, body.profissao, body.data_nasc, body.fk_tarefa, id])
    return res.json("Alterado com sucesso!")
})


/* ------------------------------ Projetos ------------------------------ */

// Mostrando todos os Projetos
routes.get('/projetos', (req, res) => { 
    cliente.query("SELECT * FROM projetos ORDER BY id")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando projetos pelo ID
routes.get('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT * FROM projetos WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo projetos
routes.post('/projetos', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO projetos (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    return res.json("Inserido com sucesso!")
})

// Deletando projetos
routes.delete('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM projetos WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando projetos
routes.put('/projetos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE projetos SET nome = $1, descricao = $2, data_criacao = $3 WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

/* ------------------------------ Equipes ------------------------------ */

// Mostrando todas as equipes
routes.get('/equipes', (req, res) => { 
    cliente.query("SELECT * FROM equipes ORDER BY id")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando equipes específicas pelo ID
routes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT * FROM equipes WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo equipes
routes.post('/equipes', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO equipes (nome, fk_projetos, fk_lider) values ($1, $2, $3)', [body.nome, body.fk_projetos, body.fk_lider])
    return res.json("Inserido com sucesso!")
})

// Deletando equipes
routes.delete('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM equipes WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando equipes
routes.put('/equipes/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE equipes SET nome = $1, fk_projetos = $2, fk_lider = $3 WHERE id = $4', [body.nome, body.fk_projetos, body.fk_lider, id])
    return res.json("Alterado com sucesso!")
})

/* ------------------------------ Tarefas ------------------------------ */

// Mostrando todas as tarefas
routes.get('/tarefas', (req, res) => { 
    cliente.query("SELECT * FROM tarefas ORDER BY id")
    .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando tarefas pelo ID
routes.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT * FROM tarefas WHERE id = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Deletando tarefas
routes.delete('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM tarefas WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando tarefas
routes.put('/tarefas/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE tarefas SET nome = $1, descricao = $2, data_criacao = $3  WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})


/* --------------------- Rotas Relacionadas com a interação de duas listas --------------------- */

// Inserir Tarefa em um projeto
routes.post('projetos/:id/tarefas', (req, res) => { 
    const body = req.body
    const id = req.params.id

    /*
    cliente.query('INSERT INTO tarefas (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    cliente.query('INSERT INTO possuem_projetos_tarefas (fk_projetos, fk_tarefas) values ($1, $2)', [id, ])
    */
    return res.json("Inserido com sucesso!")
})


// Mostar as pessoas de uma equipe

// Mostrar tarefas de uma equipe

// Mostar tarefa de uma pessoa

// Mostrar equipes de um projeto

// Mostrar pessoas com uma mesma tarefa

module.exports = routes
