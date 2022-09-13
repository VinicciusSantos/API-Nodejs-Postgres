const Equipe = require('../../infra/equipe/sequelize/data')
const Tarefa = require('../../infra/tarefa/sequelize/data')

exports.NovaEquipe = async (NovaEquipe) => {
    return await Equipe.NovaEquipe(NovaEquipe)
}

exports.BuscarEquipes = async () => {
    const eqs = await Equipe.BuscarEquipes()
    // if (eqs.length === 0) throw new Error(`Nenhuma Equipe Encontrada`)
    return eqs
}

exports.BuscarPorId = async (id) => {
    try {
        const eq = await Equipe.BuscarPorId(id)
        if (!eq) throw new Error(`Equipe ${id} não foi encontrada`)
        
        const tarefas = await Tarefa.BuscarTarefasEquipe(id)
        eq.dataValues.tarefas = {}
        eq.dataValues.tarefas.total = (tarefas[0].length)
        eq.dataValues.tarefas.NaoIniciadas = tarefas[0].filter(t => t.status == "Não Iniciada").length
        eq.dataValues.tarefas.EmAndamento = tarefas[0].filter(t => t.status == "Em Desenvolvimento").length
        eq.dataValues.tarefas.EmTestes = tarefas[0].filter(t => t.status == "Em Testes").length
        eq.dataValues.tarefas.Concluidas = tarefas[0].filter(t => t.status == "Concluido").length
        return eq
    } catch (err) {
        throw new Error(err)
    }
}

exports.Edit = async (id, equipe) => {
    try {
        await Equipe.Edit(id, equipe)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const eq = await this.BuscarPorId(id)
        if (!eq) throw new Error(`Equipe ${id} não encontrada`)
        await Equipe.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}