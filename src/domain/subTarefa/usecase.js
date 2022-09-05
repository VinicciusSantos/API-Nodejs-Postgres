const SubTarefa = require('../../infra/subTarefa/sequelize/data')

exports.NovaSubTarefa = async (nova) => {
    try {
        const novosDados = await SubTarefa.NovaSubTarefa(nova)
        return novosDados
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarSubTarefas = async () => {
    try {
        const todasSubTarefas = await SubTarefa.BuscarSubTarefas()
        return todasSubTarefas
    } catch (error) {
        throw new Error(error)
    }
}
