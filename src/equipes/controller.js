const express = require('express')
const equipes = express.Router()

const add_equipe = require('./add_equipe')
const delete_equipe = require('./delete_equipe')
const get_all = require('./get_all')
const get_equipe_members = require('./get_equipe_members')
const get_equipe = require('./get_equipe')
const join_eqipes_pessoas = require('./join_equipes_pessoas')
const update_equipe = require('./update_equipe')

equipes.use(add_equipe)
equipes.use(delete_equipe)
equipes.use(get_all)
equipes.use(get_equipe_members)
equipes.use(get_equipe)
equipes.use(join_eqipes_pessoas)
equipes.use(update_equipe)

module.exports = equipes
