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
        if (todasSubTarefas.lenght == 0) throw new Error("Nenhuma Subtarefa Encontrada")
        return todasSubTarefas
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarPorId = async (id) => {
    try {
        const sub = await SubTarefa.BuscarPorId(id)
        if (!sub) throw new Error(`Nenhuma Subtarefa Encontrada com o Id: ${id}`)
        return sub
    } catch (error) {
        throw new Error(error)
    }
}

exports.Edit = async (id, subTarefa) => {
    try {
        await SubTarefa.Edit(id, subTarefa)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const sub = await this.BuscarPorId(id)
        if (!sub) throw new Error(`Tarefa ${id} não encontrada`)
        await SubTarefa.Delete(id)
        return this.BuscarSubTarefas()
    } catch (error) {
        throw new Error(error)
    }
}