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