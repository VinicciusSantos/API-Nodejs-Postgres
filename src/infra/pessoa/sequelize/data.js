const sequelize = require('sequelize')
const Pessoa = require('../model/model')

exports.NovaPessoa = (pessoa) => {
    return Pessoa.create(pessoa)
}

exports.BuscarPessoas = () => {
    return Pessoa.findAll()
}

exports.BuscarPorId = (id) => {
    return Pessoa.findByPk(id)
}

exports.Edit = (id, pessoa) => {
    return Pessoa.update(pessoa, { where: { id: id }})
}

exports.Delete = (id) => {
    return Pessoa.destroy({ where: { id: id }})
}

exports.getCargos = () => {
    return Pessoa.findAll({
        attributes: ['cargo', [sequelize.fn('COUNT', '*'), 'count']],
        group: ['cargo']
    })
}

exports.getByCargos = (cargo) => {
    return Pessoa.findAll({ where: { cargo: { [sequelize.Op.iLike]: cargo } } })
}