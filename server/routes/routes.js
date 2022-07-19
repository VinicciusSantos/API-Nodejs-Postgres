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
const atualizacoes = require('./atualizacoes')
const relatorios = require('./relatorios')
const cargos = require('./cargos')


routes.use(pessoas)
routes.use(projetos)
routes.use(equipes)
routes.use(tarefas)
routes.use(atualizacoes)
routes.use(relatorios)
routes.use(cargos)

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Acesse https://github.com/VinicciusSantos/API-Nodejs-Postgres para saber mais`)
})

module.exports = routes
