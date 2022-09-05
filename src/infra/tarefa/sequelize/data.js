const Tarefa = require('../model/model')
const Pessoa = require('../../pessoa/model/model')
const SubTarefa = require('../../subTarefa/model/model')
const sequelize = require('sequelize')

exports.NovaTarefa = (tarefaNova) => {
    return Tarefa.create(tarefaNova)
}

exports.BuscarTarefas = () => {
    return Tarefa.findAll({
        include: [{ model: Pessoa }, { model: SubTarefa }]
    })
}

exports.BuscarPorId = (id) => {
    return Tarefa.findOne({
        include: [{ model : Pessoa }, { model: SubTarefa }],
        where: { id: id }
    })
}

exports.Edit = (id, tarefa) => {
    return Tarefa.update(tarefa, { where: { id: id }})
}

exports.Delete = (id) => {
    return Tarefa.destroy({ where: { id: id }})
}

exports.CheckAllSubTarefas = (id, status) => {
    return SubTarefa.update({ status: status}, {
        where: { tarefaId: id }
    })
}

exports.BuscarPelaPrioridade = (prioridade) => {
    return Tarefa.findAll({ where: { prioridade }})
}

exports.VerStatus = () => {
    return Tarefa.findAll({
        attributes: ['status', [sequelize.fn('COUNT', '*'), 'count']],
        group: ['status']
    })
}

exports.BuscarPorStatus = (status) => {
    return Tarefa.findAll({ where: { status: status }})
}