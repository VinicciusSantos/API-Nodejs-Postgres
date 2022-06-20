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

// Mostrar tarefas de um projeto
routes.get('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT possuem_projetos_tarefas.fk_tarefas, tarefas.nome, tarefas.descricao, tarefas.data_criacao from  possuem_projetos_tarefas INNER JOIN tarefas on possuem_projetos_tarefas.fk_tarefas = tarefas.id WHERE possuem_projetos_tarefas.fk_projetos = $1', [id])
        .then(results => {
            return res.json(results.rows)
        })
})


// Mostrar as pessoas de uma equipe
routes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT pertencem_pessoas_equipes.fk_pessoas, pessoas.nome, pessoas.profissao, pessoas.data_nasc FROM pertencem_pessoas_equipes INNER JOIN pessoas on pertencem_pessoas_equipes.fk_pessoas = pessoas.id WHERE pertencem_pessoas_equipes.fk_equipes = $1', [id])
        .then(results => {
            return res.json(results.rows)
        })

})

// Inserir tarefas em um projeto
routes.post('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query("INSERT INTO tarefas (nome, descricao, data_criacao) VALUES $1, $2, $3", [body.nome, body.descricao, body.data_criacao])
})


// Mostrar tarefa de uma pessoa
routes.get('/pessoas/:id/tarefas', (req, res) => { 
    const id = req.params.id
    
    cliente.query("SELECT pessoas.id, pessoas.nome, pessoas.fk_tarefa,tarefas.id, tarefas.nome, tarefas.descricao, tarefas.data_criacao from pessoas INNER JOIN possuem_projetos_tarefas ON possuem_projetos_tarefas.id = pessoas.fk_tarefa INNER JOIN tarefas ON tarefas.id = possuem_projetos_tarefas.fk_tarefas WHERE pessoas.id = $1", [id])
    .then(results => {
        return res.json(results.rows)
    })

})

// Mostrar equipes de um projeto
routes.get('/projetos/:id/equipes', (req, res) => { 
    const id = req.params.id

    cliente.query('SELECT * FROM equipes WHERE fk_projetos = $1', [id])
        .then(results => {
            return res.json(results.rows)
        })

})

// Mostrar pessoas com uma mesma tarefa
routes.get('/tarefas/:id/pessoas', (req, res) => { 
    const id = req.params.id
    cliente.query('SELECT * FROM pessoas WHERE fk_tarefa = $1', [id])
    .then(results => {
        return res.json(results.rows)
    })
})

// Inserir Tarefa em um projeto
routes.post('/projetos/:id/tarefas', (req, res) => { 
    const body = req.body

    let newId
    cliente.query('INSERT INTO tarefas (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    cliente.query('SELECT * FROM tarefas WHERE nome = $1, descricao = $2, data_criacao = $3', [body.nome, body.descricao, body.data_criacao])
        .then(res => newId = res.rows[0])
        .catch(e => console.error(e.stack))

    cliente.query('INSERT INTO possuem_projetos_tarefas (fk_projetos, fk_tarefas) values ($1, $2)', [id, newId])
    return res.json("Tarefa $1 Inserida com Sucesso no projeto $2!", [newId, id])
})


module.exports = routes
