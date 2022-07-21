const express = require('express')
const routes = express.Router()

var cliente = require('../database/connection.js')
cliente.connect()

const cargos = require('./cargos')
const pessoas = require('./pessoas')
const projetos = require('./projetos')
const equipes = require('./equipes')
const tarefas = require('./tarefas')
const atualizacoes = require('./atualizacoes')
const relatorios = require('./relatorios')

routes.use(cargos)
routes.use(pessoas)
routes.use(projetos)
routes.use(equipes)
routes.use(tarefas)
routes.use(atualizacoes)
routes.use(relatorios)

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Acesse https://github.com/VinicciusSantos/API-Nodejs-Postgres para saber mais`)
})

module.exports = routes
