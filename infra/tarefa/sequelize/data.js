const Tarefa = require('../model/model')

exports.NovaTarefa = (tarefaNova) => {
    return Tarefa.create(tarefaNova)
}

exports.BuscarTarefas = () => {
    return Tarefa.findAll()
}

exports.BuscarPorId = (id) => {
    return Tarefa.findByPk(id)
}

exports.Edit = (id, tarefa) => {
    return Tarefa.update(tarefa, { where: { id: id }})
}

exports.Delete = (id) => {
    return Tarefa.destroy({ where: { id: id }})
}