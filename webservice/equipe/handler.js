const Equipe = require('../../domain/equipe/usecase')
const ModelApresentacao = require('../../domain/equipe/model/model')

exports.NovaEquipe = async (req, res) => {
    const { nome, foto } = req.body
    let equipeNova = new ModelApresentacao(nome, foto)

    try {
        const novosDados = await Equipe.NovaEquipe(req, res, equipeNova)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar a equipe", error: error})
    }
}

exports.BuscarEquipes = async (req, res) => {
    try {
        const todasEquipes = await Equipe.BuscarEquipes(req, res)
        return res.status(200).json({message: "Retornando todas as equipes com sucesso", data: todasEquipes})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as equipes", error: error})
    }
}