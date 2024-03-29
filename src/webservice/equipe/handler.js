const Equipe = require('../../domain/equipe/usecase')
const EquipePessoa = require('../../domain/equipePessoa/usecase')
const ModelApresentacao = require('../../domain/equipe/model/model')
const FotosPadrao = require('../../domain/fotoPadrao/usecase')
const { s3Uploadv2 } = require("../../middlewares/s3Service");

exports.NovaEquipe = async (req, res) => {
    const { nome, pessoas, fotoPadraoId } = req.body
    let equipeNova = new ModelApresentacao(nome, fotoPadraoId)

    try {
        let novosDados = await Equipe.NovaEquipe(equipeNova)
        if (pessoas)
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
    const { nome, pessoas, foto } = req.body
    let equipe = new ModelApresentacao(nome, foto)

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

exports.BuscarFotos = async (req, res) => {
    try {
        const fotos = await FotosPadrao.BuscarFotos() 
        return res.status(200).json({message: `${fotos.length} fotos encontradas`, data: fotos})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar as fotos", error: error.message})
    }
}

exports.AddFoto = async (req, res) => {
    try {
        if (req.file) {
            var result = await s3Uploadv2(req.file)
        } else throw new Error("Nenhuma foto recebida")
        const foto = await FotosPadrao.AddFoto(result.Location) 
        return res.status(200).json({message: `Foto enviada com sucesso!`, data: foto})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar as fotos", error: error.message})
    }
}
