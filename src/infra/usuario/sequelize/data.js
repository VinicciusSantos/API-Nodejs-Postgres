const sequelize = require('sequelize')
const Usuario = require('../model/model')

exports.Cadastro = (usuario) => {
    return Usuario.create(usuario)
}

exports.BuscarUm = (email) => {
    return Usuario.findOne({ where: { email: email }})
}