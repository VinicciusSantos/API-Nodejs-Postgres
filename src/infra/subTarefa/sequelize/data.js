const SubTarefa = require('../../subTarefa/model/model')
const Tarefa = require('../../tarefa/model/model')

exports.NovaSubTarefa = async (subTarefa) => {
    return SubTarefa.create(subTarefa)
}

exports.BuscarSubTarefas = async () => {
    return SubTarefa.findAll()
}

exports.BuscarPorId = (id) => {
    return SubTarefa.findOne({
        where: { id: id },
        include: Tarefa
    })
}

exports.Edit = (id, subTarefa) => {
    return SubTarefa.update(subTarefa, { where: { id: id }})
}

exports.Delete = (id) => {
    return SubTarefa.destroy({ where: { id: id }})
}