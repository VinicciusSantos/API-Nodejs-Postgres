const Equipe = require('../../infra/equipe/sequelize/data')

exports.NovaEquipe = async (req, res, NovaEquipe) => {
    NovaEquipe.nome = `Equipe: ${NovaEquipe.nome}`

    try {
        const resp = await Equipe.NovaEquipe(NovaEquipe)
        console.log(resp)
        return res.status(201).json({message: "Criado com sucesso", response: resp})
    } catch (err) { return res.status(400).json({message: "Erro", err}) }
}