const SubTarefa = require('../../subTarefa/model/model')

exports.NovaSubTarefa = async (subTarefa) => {
    return SubTarefa.create(subTarefa)
}

exports.BuscarSubTarefas = async () => {
    return SubTarefa.FindAll()
}