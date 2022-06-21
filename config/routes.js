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
    cliente
        .query("SELECT * FROM pessoas ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando pessoas com um ID específico
routes.get('/pessoas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM pessoas WHERE id = $1', [id])
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
    cliente
        .query("SELECT * FROM projetos ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando projetos pelo ID
routes.get('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM projetos WHERE id = $1', [id])
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
    cliente
        .query("SELECT * FROM equipes ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando equipes específicas pelo ID
routes.get('/equipes/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE id = $1', [id])
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
    cliente
        .query("SELECT * FROM tarefas ORDER BY id")
        .then(results => {
        return res.json(results.rows)
    })
})

//Inserindo Tarefas
routes.post('/tarefas', (req, res) => { 
    const body = req.body

    cliente.query('INSERT INTO tarefas (nome, descricao, data_criacao) values ($1, $2, $3)', [body.nome, body.descricao, body.data_criacao])
    return res.json("Inserido com sucesso!")
})

// Mostrando tarefas pelo ID
routes.get('/tarefas/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM tarefas WHERE id = $1', [id])
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

// Mostrar pessoas de um projeto
routes.get('/projetos/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pj.id, pj.nome, pe.id, pe.nome FROM pessoas AS pe
                   INNER JOIN pertencem_pessoas_equipes AS ppe ON ppe.fk_pessoas = pe.id
                   INNER JOIN equipes AS eq ON eq.id = ppe.fk_equipes
                   INNER JOIN projetos AS PJ ON pj.id = eq.fk_projetos
                   WHERE pj.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar tarefas de um projeto
routes.get('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT ppt.id, pr.nome, tr.nome FROM possuem_projetos_tarefas as ppt
                INNER JOIN projetos as pr on ppt.fk_projetos = pr.id
                INNER JOIN tarefas as tr on ppt.fk_tarefas = tr.id
                WHERE pr.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar as pessoas de uma equipe
routes.get('/equipes/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT ppe.fk_pessoas, pe.nome, pe.profissao, pe.data_nasc FROM pertencem_pessoas_equipes as ppe
                INNER JOIN pessoas as pe on ppe.fk_pessoas = pe.id
                WHERE ppe.fk_equipes = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar tarefas de uma pessoa
routes.get('/pessoas/:id/tarefas', (req, res) => { 
    const id = req.params.id
    
    cliente
        .query(`SELECT pe.nome, tr.id, tr.nome, tr.descricao, tr.data_criacao from pessoas as pe
                INNER JOIN recebem_tarefas_pessoas AS rtp ON rtp.fk_pessoas = pe.id
                INNER JOIN possuem_projetos_tarefas AS ppt ON ppt.id = rtp.fk_pert_pess_tar
                INNER JOIN tarefas AS tr ON tr.id = ppt.fk_tarefas
                WHERE pe.id = $1`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrar equipes de um projeto
routes.get('/projetos/:id/equipes', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM equipes WHERE fk_projetos = $1', [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar pessoas com uma mesma tarefa
routes.get('/tarefas/:id/pessoas', (req, res) => { 
    const id = req.params.id
    cliente
        .query(`SELECT tr.id, tr.nome, pe.id, pe.nome, pe.profissao from tarefas as tr
                INNER JOIN possuem_projetos_tarefas AS ppt ON ppt.fk_tarefas = tr.id
                INNER JOIN recebem_tarefas_pessoas AS rtp ON rtp.fk_pert_pess_tar = ppt.fk_tarefas
                INNER JOIN pessoas AS pe ON pe.id = rtp.fk_pessoas
                WHERE tr.id = $1
                ORDER BY tr.id, pe.id`, [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Associar Pessoa com Equipe
routes.post('/equipes/:id_equipe/pessoas/:id_pessoa', (req, res) => { 
    const id_equipe = req.params.id_equipe
    const id_pessoa = req.params.id_pessoa

    cliente.query(`INSERT INTO pertencem_pessoas_equipes (fk_pessoas, fk_equipes)
                   VALUES ($1, $2)`, [id_equipe, id_pessoa])

    return res.json("Pessoa Inserida na Equipe")
})

// Associar Tarefa com Projeto
routes.post('/projetos/:id_projeto/tarefas/:id_tarefa', (req, res) => { 
    const id_projeto = req.params.id_projeto
    const id_tarefa = req.params.id_tarefa

    cliente.query(`INSERT INTO possuem_projetos_tarefas (fk_projetos, fk_tarefas)
                   VALUES ($1, $2)`, [id_projeto, id_tarefa])

    return res.json("Tarefa inserida no projeto")
})

// Associar Tarefas com Pessoas
routes.post('/pessoas/:id_pessoa/tarefas/:id_tarefa', (req, res) => { 
    const id_pessoa = req.params.id_pessoa
    const id_tarefa = req.params.id_tarefa

    // INSERT INTO recebem_tarefas_pessoas (fk_pessoas, fk_pert_pess_tar) VALUES ($1, $2)    let resultste
    cliente    
        .query(`SELECT ppt.id FROM tarefas AS tr
                INNER JOIN possuem_projetos_tarefas AS ppt ON ppt.fk_tarefas = tr.id
                WHERE tr.id = $1`, [id_tarefa])
        .then(r => {})

    return res.json("Tarefa inserida no projeto")
})

module.exports = routes
