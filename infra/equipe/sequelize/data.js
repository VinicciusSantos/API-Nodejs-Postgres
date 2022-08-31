const Equipe = require('../model/model')

exports.NovaEquipe = (EquipeNova) => {
    return Equipe.create(EquipeNova)
}

exports.BuscarEquipes = () => {
    return Equipe.findAll()
}

exports.BuscarPorId = (id) => {
    return Equipe.findByPk(id)
}

exports.Edit = (id, equipe) => {
    return Equipe.update(equipe, { where: { id: id }})
}

exports.Delete = (id) => {
    return Equipe.destroy({ where: { id: id }})
}