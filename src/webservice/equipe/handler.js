const Equipe = require('../../domain/equipe/usecase')
const EquipePessoa = require('../../domain/equipePessoa/usecase')
const ModelApresentacao = require('../../domain/equipe/model/model')

exports.NovaEquipe = async (req, res) => {
    const { nome, pessoas } = req.body
    let equipeNova = new ModelApresentacao(nome)

    try {
        let novosDados = await Equipe.NovaEquipe(equipeNova)
        novosDados = await EquipePessoa.AssociaEquipePessoas(novosDados.dataValues.id, pessoas)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: error.message})
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
        return res.status(200).json({message: "Retornando a equipe com sucesso", data: equipe })
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar equipe", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, pessoas } = req.body
    let equipe = new ModelApresentacao(nome)

    try {
        const editada = await Equipe.Edit(id, equipe)
        const associa = await EquipePessoa.AssociaEquipePessoas(id, pessoas)
        return res.status(200).json({message: `Editado com Sucesso!`, data: associa})
    } catch (error) {
        console.error(error)
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

exports.AssociaPessoa = async (req, res) => {
    const { eq, pe } = req.params

    try {
        const vinculo = await EquipePessoa.AssociaEquipePessoas(eq, [{id: parseInt(pe)}])
        return res.status(201).json({ message: `Equipe ${eq} associada com a pessoa ${pe}`, data: vinculo}) 
    } catch (error) {
        return res.status(400).json({message: "Erro ao Associar Equipe", error: error.message})
    }
}
