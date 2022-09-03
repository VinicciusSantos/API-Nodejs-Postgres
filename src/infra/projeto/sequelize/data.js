const sequelize = require('sequelize')
const Projeto = require('../model/model')
const Equipe = require('../../equipe/model/model')
const Tarefa = require('../../tarefa/model/model')

exports.NovoProjeto = (ProjetoNovo) => {
    return Projeto.create(ProjetoNovo)
}

exports.BuscarProjetos = () => {
    return Projeto.findAll()
}

exports.BuscarPorId = (id) => {
    return Projeto.findOne({
        include: [{ model: Equipe }, { model: Tarefa}],
        where: { id: id }
    })
}

exports.BuscarPorNome = (nome) => {
    return Projeto.findOne({ where: { nome: nome } })
}

exports.Edit = (id, projeto) => {
    return Projeto.update(projeto, { where: { id: id }})
}

exports.Delete = (id) => {
    return Projeto.destroy({ where: { id: id }})
}

exports.VerStatus = () => {
    return Projeto.findAll({
        attributes: ['status', [sequelize.fn('COUNT', '*'), 'count']],
        group: ['status']
    })
}

exports.BuscarPorStatus = (status) => {
    return Projeto.findAll({ where: { status: status }})
}