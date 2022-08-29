const express = require('express')
const tarefas = express.Router()

const get_all = require('./get_all')
const get_status = require('./get_status')
const get_tarefa = require('./get_tarefa')
const add_tarefa = require('./add_tarefa')
const delete_tarefa = require('./delete_tarefa')
const update_tarefa = require('./update_tarefa')
const get_filter_by_status = require('./get_filter_by_status')
const get_filter_by_prioridade = require('./get_filter_by_prioridade')
const update_status = require('./update_status')
const update_subtarefa_status = require('./update_subtarefa_status')
const update_subtarefa = require('./update_subtarefa')
const delete_subtarefa = require('./delete_subtarefa')
const add_subtarefas = require('./add_subtarefas')
const check_subtarefas = require('./check_subtarefas')

tarefas.use(get_all)
tarefas.use(get_status)
tarefas.use(get_tarefa)
tarefas.use(add_tarefa)
tarefas.use(delete_tarefa)
tarefas.use(update_tarefa)
tarefas.use(get_filter_by_status)
tarefas.use(get_filter_by_prioridade)
tarefas.use(update_status)
tarefas.use(add_subtarefas)
tarefas.use(update_subtarefa_status)
tarefas.use(update_subtarefa)
tarefas.use(delete_subtarefa)
tarefas.use(check_subtarefas)

module.exports = tarefas