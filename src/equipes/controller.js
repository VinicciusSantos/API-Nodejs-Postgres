const express = require('express')
const equipes = express.Router()

const add_equipe = require('./add_equipe')
const delete_equipe = require('./delete_equipe')
const get_all = require('./get_all')
const get_equipe = require('./get_equipe')
const join_eqipes_pessoas = require('./join_equipes_pessoas')
const update_equipe = require('./update_equipe')
const get_fotos = require('./get_fotos')
const add_foto = require('./add_foto')

equipes.use(add_equipe)
equipes.use(get_fotos)
equipes.use(add_foto)
equipes.use(delete_equipe)
equipes.use(get_all)
equipes.use(get_equipe)
equipes.use(join_eqipes_pessoas)
equipes.use(update_equipe)

module.exports = equipes
