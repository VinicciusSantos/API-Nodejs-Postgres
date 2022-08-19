const express = require('express')
const users = express.Router()

const registro = require('./register')

users.use(registro)

module.exports = users