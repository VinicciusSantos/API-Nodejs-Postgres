const sequelize = require('sequelize')
const Projeto = require('../model/model')

exports.NovoProjeto = (ProjetoNovo) => {
    return Projeto.create(ProjetoNovo)
}

exports.BuscarProjetos = () => {
    return Projeto.findAll()
}

exports.BuscarPorId = (id) => {
    return Projeto.findByPk(id)
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