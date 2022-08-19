const express = require('express')
const users = express.Router()

const registro = require('./register')
const login = require('./login')

users.use(registro)
users.use(login)

module.exports = users