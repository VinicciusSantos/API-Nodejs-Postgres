const Projeto = require('../../infra/projeto/sequelize/data')
const Tarefa = require('../../infra/tarefa/sequelize/data')

exports.NovaTarefa = async (NovaTarefa) => {
    try {
        return await Tarefa.NovaTarefa(NovaTarefa)
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarTarefas = async () => {
    try {
        const trs = await Tarefa.BuscarTarefas()
        // if (trs.length === 0) throw new Error(`Nenhuma Tarefa Encontrada`)
        return trs
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarPorId = async (id) => {
    try {
        const tr = await Tarefa.BuscarPorId(id)
        if (!tr) throw new Error(`Tarefa ${id} não foi encontrada`)
        return tr
    } catch (error) {
        throw new Error(error)
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

exports.BuscarPelaPrioridade = async (prioridade) => {
    try {
        const dados = await Tarefa.BuscarPelaPrioridade(prioridade)
        // if (dados.length === 0) throw new Error(`Nenhuma Tarefa Encontrada com a prioridade: ${prioridade}`)
        return dados
    } catch (error) {
        throw new Error(error)
    }
}

exports.VerStatus = async () => {
    try {
        const status = await Tarefa.VerStatus()
        // if (status.length === 0) throw new Error("Nenhum Status Encontrado")
        return status
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarPorStatus = async (status) => {
    try {
        const tarefasFiltradas = await Tarefa.BuscarPorStatus(status)
        // if (tarefasFiltradas.length === 0) throw new Error(`Nenhuma tarefa encontrada com o status ${status}`)
        return tarefasFiltradas
    } catch (error) {
        throw new Error(error)
    }
}

exports.MudarStatus = async (id, status) => {
    try {
        const tr = this.BuscarPorId(id)
        tr.status = status
        const edited = await this.Edit(id, tr)

         // Buscando o projeto que a tarefa está
        const projeto = await Tarefa.BuscarProjeto(id)

        // Verificando as tarefas do projeto para mudar o status dele, caso necessário
        const tarefasDoProjeto = await Projeto.BuscarTarefas(projeto[0][0].projetoId)

        if (tarefasDoProjeto[0].filter(tr => tr.status === "Não Iniciada").length === tarefasDoProjeto[0].length)
            await Projeto.EditStatus(projeto[0][0].projetoId, "Não Iniciado")
        else if (tarefasDoProjeto[0].filter(tr => tr.status === "Concluido").length === tarefasDoProjeto[0].length)
            await Projeto.EditStatus(projeto[0][0].projetoId, "Concluido")
        else await Projeto.EditStatus(projeto[0][0].projetoId, "Em Andamento")
        return edited   
    } catch (error) {
        throw new Error(error)
    }
}
