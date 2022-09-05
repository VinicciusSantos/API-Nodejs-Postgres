const SubTarefa = require('../../subTarefa/model/model')
const Tarefa = require('../../tarefa/model/model')

exports.NovaSubTarefa = async (subTarefa) => {
    return SubTarefa.create(subTarefa)
}

exports.BuscarSubTarefas = async () => {
    return SubTarefa.FindAll()
}