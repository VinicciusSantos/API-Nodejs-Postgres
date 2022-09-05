const Tarefa = require('../../infra/tarefa/sequelize/data')

exports.NovaTarefa = async (NovaTarefa) => {
    return await Tarefa.NovaTarefa(NovaTarefa)
}

exports.BuscarTarefas = async () => {
    const trs = await Tarefa.BuscarTarefas()
    if (trs.length === 0) throw new Error(`Nenhuma Tarefa Encontrada`)
    return trs
}

exports.BuscarPorId = async (id) => {
    try {
        const tr = await Tarefa.BuscarPorId(id)
        if (!tr) throw new Error(`Tarefa ${id} não foi encontrada`)
        return tr
    } catch (err) {
        throw new Error(err)
    }
}

exports.Edit = async (id, tarefa) => {
    try {
        await Tarefa.Edit(id, tarefa)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const tr = await this.BuscarPorId(id)
        if (!tr) throw new Error(`Tarefa ${id} não encontrada`)
        await Tarefa.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.CheckAllSubTarefas = async (id, status) => {
    try {
        await Tarefa.CheckAllSubTarefas(id, status)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}