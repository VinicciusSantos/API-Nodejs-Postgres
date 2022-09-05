const SubTarefa = require('../../domain/subTarefa/usecase.js')
const ModelApresentacao = require('../../domain/subTarefa/model/model.js')

exports.NovaSubTarefa = async (req, res) => {
    const { nome, prioridade, fk_tarefa } = req.body
    let SubTarefaNova = new ModelApresentacao(nome, prioridade, fk_tarefa)

    try {
        const novosDados = await SubTarefa.NovaSubTarefa(SubTarefaNova)
        return res.status(201).json({message: "Criada com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar a SubTarefa", error: error.message})
    }
}

exports.BuscarSubTarefas = async (req, res) => {
    try {
        const todasSubTarefas = await SubTarefa.BuscarSubTarefas()
        return res.status(200).json({message: "Retornando todas as SubTarefas com sucesso", data: todasSubTarefas})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as SubTarefas", error: error.message})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const SubTarefa = await SubTarefa.BuscarPorId(id)
        return res.status(200).json({message: "Retornando a SubTarefa com sucesso", data: SubTarefa})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar SubTarefa", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, descricao, prioridade } = req.body
    let SubTarefa = new ModelApresentacao(nome, descricao, prioridade)

    try {
        const editada = await SubTarefa.Edit(id, SubTarefa)
        return res.status(200).json({message: `Editado com Sucesso!`, data: editada})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Editar SubTarefa", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await SubTarefa.Delete(id)
        return res.status(200).json({message: `SubTarefa ${id} Removida com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar SubTarefa", error: error.message})
    }
}

exports.CheckSubTarefas = async (req, res) => {

}

exports.UpdateSubtarefaStatus = async (req, res) => {

}