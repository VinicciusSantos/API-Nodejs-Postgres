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
