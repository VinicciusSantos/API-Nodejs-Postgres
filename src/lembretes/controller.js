const express = require("express");
const lembretes = express.Router();

const get_all = require('./get_all')
const add_lembrete = require('./add_lembrete')

lembretes.use(get_all)
lembretes.use(add_lembrete)

module.exports = lembretes;