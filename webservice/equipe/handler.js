const Equipe = require('../../domain/equipe/usecase')
const ModelApresentacao = require('../../domain/equipe/model/model')

exports.NovaEquipe = (req, res) => {
    const { nome, foto } = req.body
    let equipeNova = new ModelApresentacao(nome, foto)

    Equipe.NovaEquipe(req, res, equipeNova)
}
