const Tarefa = require('../model/model')
const Pessoa = require('../../pessoa/model/model')
const SubTarefa = require('../../subTarefa/model/model')

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