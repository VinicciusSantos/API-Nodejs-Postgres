const express = require('express')
const projetos = express.Router()

const get_status = require('./get_status')
const get_projeto = require('./get_projeto')
const add_projeto = require('./add_projeto')
const delete_projeto = require('./delete_projeto')
const update_projeto = require('./update_projeto')
const get_project_members = require('./get_project_members')
const join_projetos_tarefas = require('./join_projetos_tarefas')
const get_filter_by_status = require('./get_filter_by_status')
const update_status = require('./update_status')

projetos.use(get_status)
projetos.use(get_projeto)
projetos.use(add_projeto)
projetos.use(delete_projeto)
projetos.use(update_projeto)
projetos.use(get_project_members)
projetos.use(join_projetos_tarefas)
projetos.use(get_filter_by_status)
projetos.use(update_status)

module.exports = projetos