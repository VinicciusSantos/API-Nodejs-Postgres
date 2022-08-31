const Equipe = require('../../infra/equipe/sequelize/data')

exports.NovaEquipe = async (req, res, NovaEquipe) => {
    NovaEquipe.nome = `Equipe: ${NovaEquipe.nome}`

    return await Equipe.NovaEquipe(NovaEquipe)
}

exports.BuscarEquipes = async (req, res) => {
    return await Equipe.BuscarEquipes()
}