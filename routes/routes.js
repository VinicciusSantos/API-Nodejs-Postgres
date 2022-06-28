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

const pessoas = require('./pessoas')
const projetos = require('./projetos')
const equipes = require('./equipes')
const tarefas = require('./tarefas')

routes.use(pessoas)
routes.use(projetos)
routes.use(equipes)
routes.use(tarefas)

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Menu Principal, Acesse: https://github.com/VinicciusSantos/API-NodeJs para saber mais`)
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
