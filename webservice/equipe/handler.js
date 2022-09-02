const Equipe = require('../../domain/equipe/usecase')
const ModelApresentacao = require('../../domain/equipe/model/model')

exports.NovaEquipe = async (req, res) => {
    const { nome, foto } = req.body
    let equipeNova = new ModelApresentacao(nome, foto)

    try {
        const novosDados = await Equipe.NovaEquipe(equipeNova)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar a equipe", error: error.message})
    }
}

exports.BuscarEquipes = async (req, res) => {
    try {
        const todasEquipes = await Equipe.BuscarEquipes()
        return res.status(200).json({message: "Retornando todas as equipes com sucesso", data: todasEquipes})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as equipes", error: error.message})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const equipe = await Equipe.BuscarPorId(id)
        return res.status(200).json({message: "Retornando a equipe com sucesso", data: equipe})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar equipe", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, foto } = req.body
    let equipe = new ModelApresentacao(nome, foto)

    try {
        const editada = await Equipe.Edit(id, equipe)
        return res.status(200).json({message: `Editado com Sucesso!`, data: editada})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Editar equipe", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Equipe.Delete(id)
        return res.status(200).json({message: `Equipe ${id} Removida com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar equipe", error: error.message})
    }
}
