const express = require("express");
const pessoas = express.Router();

const get_all = require('./get_all')
const get_status = require('./get_status')
const get_pessoa = require('./get_pessoa')
const add_pessoa = require('./add_pessoa')
const delete_pessoa = require('./delete_pessoa')
const update_pessoa = require('./update_pessoa')
const join_pessoas_tarefas = require('./join_pessoas_tarefas')
const get_filter_by_status = require('./get_filter_by_status')
const update_status = require('./update_status')
const get_cargos = require('./get_cargos')
const get_pessoas_by_cargo = require('./get_pessoas_by_cargo')

pessoas.use(get_all)
pessoas.use(get_status)
pessoas.use(get_pessoa)
pessoas.use(add_pessoa)
pessoas.use(delete_pessoa)
pessoas.use(update_pessoa)
pessoas.use(join_pessoas_tarefas)
pessoas.use(get_filter_by_status)
pessoas.use(update_status)
pessoas.use(get_cargos)
pessoas.use(get_pessoas_by_cargo)

module.exports = pessoas;
