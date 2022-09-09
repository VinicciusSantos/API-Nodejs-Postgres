const sequelize = require('sequelize')
const db = require('../../../config/database/dbpostgres')
const Projeto = require('../model/model')
const Equipe = require('../../equipe/model/model')
const Tarefa = require('../../tarefa/model/model')
const Pessoa = require('../../pessoa/model/model')

exports.NovoProjeto = (ProjetoNovo) => {
    return Projeto.create(ProjetoNovo)
}

exports.BuscarProjetos = () => {
    return Projeto.findAll()
}

exports.BuscarPorId = (id) => {
    return Projeto.findOne({
        include: [{ model: Equipe, include: Pessoa }],
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

exports.BuscarTarefas = (projeto) => {
    return db.query(`SELECT tr.* FROM projetos AS pr
                     INNER JOIN "projetoTarefas" AS ppt ON ppt."projetoId" = pr.id
                     INNER JOIN tarefas AS tr ON tr.id = ppt."tarefaId"
                     WHERE pr.id = ${projeto}
                     ORDER BY tr.prioridade desc, tr.nome`)
}