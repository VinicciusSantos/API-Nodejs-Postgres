const Equipe = require('../model/model')
const Pessoa = require('../../pessoa/model/model')
const Projeto = require('../../projeto/model/model')
const Tarefa = require('../../tarefa/model/model')

exports.NovaEquipe = (EquipeNova) => {
    return Equipe.create(EquipeNova)
}

exports.BuscarEquipes = () => {
    return Equipe.findAll({
        include: [{ model: Pessoa }]
    })
}

exports.BuscarCampos = (campos) => {
    return Equipe.findAll({attributes: campos})
}

exports.BuscarPorId = (id) => {
    return Equipe.findOne({
        include: [{ 
            model: Pessoa
            // include: [{ model: Tarefa }]
        }],
        where: { id: id }
    })
}

exports.Edit = (id, equipe) => {
    return Equipe.update(equipe, { where: { id: id }})
}

exports.Delete = (id) => {
    return Equipe.destroy({ where: { id: id }})
}
