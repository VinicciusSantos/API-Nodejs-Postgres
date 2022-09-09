const Tarefa = require('../../domain/tarefa/usecase')
const PessoaTarefa = require('../../domain/pessoaTarefa/usecase')
const ProjetoTarefa = require('../../domain/projetoTarefa/usecase')
const ModelApresentacao = require('../../domain/tarefa/model/model')

exports.NovaTarefa = async (req, res) => {
    const { nome, descricao, prioridade, pessoas, projetoId } = req.body
    let TarefaNova = new ModelApresentacao(nome, descricao, prioridade)

    try {
        const novosDados = await Tarefa.NovaTarefa(TarefaNova)
        console.log(novosDados.dataValues.id)
        const vinculo = await PessoaTarefa.VinculaPessoaTarefa(pessoas, novosDados.dataValues.id)
        const vinculoProjeto = await ProjetoTarefa.VincularProjetoTarefa(projetoId, novosDados.dataValues.id)
        return res.status(201).json({message: "Criada com Sucesso", data: vinculo})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar a Tarefa", error: error.message})
    }
}

exports.BuscarTarefas = async (req, res) => {
    try {
        const todasTarefas = await Tarefa.BuscarTarefas()
        return res.status(200).json({message: "Retornando todas as Tarefas com sucesso", data: todasTarefas})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as Tarefas", error: error.message})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const tarefa = await Tarefa.BuscarPorId(id)
        return res.status(200).json({message: "Retornando a Tarefa com sucesso", data: tarefa})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar Tarefa", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, descricao, prioridade } = req.body
    let tarefa = new ModelApresentacao(nome, descricao, prioridade)

    try {
        const editada = await Tarefa.Edit(id, tarefa)
        return res.status(200).json({message: `Editado com Sucesso!`, data: editada})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Editar Tarefa", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Tarefa.Delete(id)
        return res.status(200).json({message: `Tarefa ${id} Removida com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar Tarefa", error: error.message})
    }
}

exports.CheckAllSubTarefas = async (req, res) => {
    const { id, status } = req.params

    try {
        const dadosAtualizados = await Tarefa.CheckAllSubTarefas(id, status)
        return res.status(200).json({message: `Subtarefas da Tarefa: ${id} atualizadas com Status: ${status}`, data: dadosAtualizados})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Mudar os Status", error: error.message})
    }
}

exports.BuscarPelaPrioridade = async (req, res) => {
    const { prioridade } = req.params

    try {
        const dados = await Tarefa.BuscarPelaPrioridade(prioridade)
        return res.status(200).json({message: `Retornando Todas as tarefas com prioridade: ${prioridade}`, data: dados})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

exports.VerStatus = async (req, res) => {
    try {
        const status = await Tarefa.VerStatus()
        return res.status(200).json({message: "Status de tarefas obtidos com sucesso", data: status})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar status", error: error.message})
    }
}

exports.BuscarPorStatus = async(req, res) => {
    const { status } = req.params
    try {
        const tarefasComOStatus = await Tarefa.BuscarPorStatus(status)
        return res.status(200).json({message: `${tarefasComOStatus.length} tarefas com o status '${status}' foram encontrados!`, data: tarefasComOStatus})
    } catch (error) {
        return res.status(400).json({message: "Erro ao filtrar tarefas por status", error: error.message})
    }
}

exports.MudarStatus = async (req,res) => {
    const { id, status } = req.params

    try {
        const updated = await Tarefa.MudarStatus(id, status)
        return res.status(200).json({message: "Status da tarefa alterado com sucesso", data: updated})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Atualizar status", error: error.message})
    }
}
