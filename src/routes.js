const express = require('express')
const routes = express.Router()

var cliente = require('../cmd/database/connection.js')
cliente.connect()

const projetos = require('./projetos/controller')
const equipes = require('./equipes/controller')
const pessoas = require('./pessoas/controller')
const tarefas = require('./tarefas/controller')
const relatorios = require('./relatorios/controller')

routes.use(projetos)
routes.use(equipes)
routes.use(pessoas)
routes.use(tarefas)
routes.use(relatorios)

// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Acesse https://github.com/VinicciusSantos/API-Nodejs-Postgres para saber mais`)
})

module.exports = routes
