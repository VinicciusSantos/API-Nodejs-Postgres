const Tarefa = require('../model/model')
const Pessoa = require('../../pessoa/model/model')

exports.NovaTarefa = (tarefaNova) => {
    return Tarefa.create(tarefaNova)
}

exports.BuscarTarefas = () => {
    return Tarefa.findAll()
}

exports.BuscarPorId = (id) => {
    return Tarefa.findOne({
        include: [{ model : Pessoa }],
        where: { id: id }
    })
}

exports.Edit = (id, tarefa) => {
    return Tarefa.update(tarefa, { where: { id: id }})
}

exports.Delete = (id) => {
    return Tarefa.destroy({ where: { id: id }})
}