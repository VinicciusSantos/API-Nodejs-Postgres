const Lembrete = require('../model/model')

exports.NovoLembrete = (LembreteNovo) => {
    return Lembrete.create(LembreteNovo)
}

exports.BuscarLembretes = () => {
    return Lembrete.findAll()
}

exports.Delete = (id) => {
    return Lembrete.destroy({ where: { id: id }})
}

exports.BuscarPorId = (id) => {
    return Lembrete.findByPk(id)
}