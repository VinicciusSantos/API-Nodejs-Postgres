const express = require('express')
const initializePassport = require('../../cmd/passport')
const session = require('express-session')
const user = express.Router()
const passport = require('passport')

initializePassport(passport)

user.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

user.use(passport.initialize())
user.use(passport.session())

//Inserindo Tarefas
user.post('/login', passport.authenticate("local", {
    successRedirect: "/projetos",
    failureRedirect: "/login",
    failureFlash: true
}))
  
module.exports = user   