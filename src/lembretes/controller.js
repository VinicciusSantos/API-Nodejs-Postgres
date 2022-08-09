const express = require("express");
const lembretes = express.Router();

const get_all = require('./get_all')
const add_lembrete = require('./add_lembrete')
const delete_lembrete = require('./delete_lembrete')

lembretes.use(get_all)
lembretes.use(add_lembrete)
lembretes.use(delete_lembrete)

module.exports = lembretes;
