const Tarefa = require('../../domain/tarefa/usecase')
const ModelApresentacao = require('../../domain/tarefa/model/model')

exports.NovaTarefa = async (req, res) => {
    const { nome, descricao, prioridade } = req.body
    let TarefaNova = new ModelApresentacao(nome, descricao, prioridade)

    try {
        const novosDados = await Tarefa.NovaTarefa(TarefaNova)
        return res.status(201).json({message: "Criada com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar a Tarefa", error: error})
    }
}

exports.BuscarTarefas = async (req, res) => {
    try {
        const todasTarefas = await Tarefa.BuscarTarefas()
        return res.status(200).json({message: "Retornando todas as Tarefas com sucesso", data: todasTarefas})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as Tarefas", error: error})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const tarefa = await Tarefa.BuscarPorId(id)
        return res.status(200).json({message: "Retornando a Tarefa com sucesso", data: tarefa})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar Tarefa", error: error})
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
        return res.status(400).json({message: "Erro ao Editar Tarefa", error: error})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Tarefa.Delete(id)
        return res.status(200).json({message: `Tarefa ${id} Removida com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar Tarefa", error: error})
    }
}
