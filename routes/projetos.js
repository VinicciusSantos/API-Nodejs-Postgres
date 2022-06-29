const express = require('express')
const projetos = express.Router()

const { Client } = require('pg');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todos os Projetos
projetos.get('/projetos', (req, res) => { 
    cliente
        .query(`SELECT * FROM projetos ORDER BY id`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Quantidade de projetos
projetos.get('/projetos/count', (req, res) => { 
    cliente
        .query("select count(*) from projetos")
        .then(results => {
        return res.json(results.rows)
    })
})

// Mostrando projetos pelo ID
projetos.get('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente
        .query('SELECT * FROM projetos WHERE id = $1', [id])
        .then(results => {
        return res.json(results.rows)
    })
})

// Inserindo projetos
projetos.post('/projetos', (req, res) => { 
    const body = req.body

    cliente
        .query(`INSERT INTO projetos (nome, descricao, data_criacao, status)
                VALUES ($1, $2, $3, $4)`, [body.nome, body.descricao, body.data_criacao, 'Ativo'])
    return res.json("Inserido com sucesso!")
})

// Deletando projetos
projetos.delete('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM projetos WHERE id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando projetos
projetos.put('/projetos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE projetos SET nome = $1, descricao = $2, data_criacao = $3 WHERE id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar pessoas de um projeto
projetos.get('/projetos/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pr.nome, pe.id, pe.nome, eq.nome FROM projetos AS pr
                INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.id
                INNER JOIN equipes AS eq ON eq.id = ppe.fk_equipe
                INNER JOIN pessoas_pertencem_equipes AS epp ON epp.fk_equipe = eq.id
                INNER JOIN pessoas AS pe ON pe.id = epp.fk_pessoa
                WHERE pr.id = $1
                ORDER BY pr.id, eq.id ,pe.id`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar tarefas de um projeto
projetos.get('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pr.id, pr.nome, tr.id, tr.nome FROM projetos AS pr
                INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.id
                INNER JOIN tarefas AS tr ON tr.id = ppt.fk_tarefa
                WHERE pr.id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar equipes de um projeto
projetos.get('/projetos/:id/equipes', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT eq.id, eq.nome FROM projetos AS pr
                INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.id
                INNER JOIN equipes AS eq ON eq.id = ppe.fk_equipe
                WHERE pr.id = $1
                ORDER BY pr.id, eq.id`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})


// Associar Tarefa com Projeto
projetos.get('/projetos/:id_projeto/tarefas/_id_tarefa', (req, res) => { 
    const id_projeto = req.params.id_projeto
    const id_tarefa = req.params.id_tarefa

    cliente
        .query(`INSERT INTO projetos_posssuem_tarefas (fk_projeto, fk_tarefa)
                VALUES ($1, $2)`, [id_projeto, id_tarefa])
        .then(results => {
            return res.json(results.rows)
        })
})

module.exports = projetos