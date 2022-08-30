const Equipe = require('../../infra/equipe/model/model') 

exports.getAll = async (req, res) => {
    const eqs = await Equipe.findAll()
    return res.status(200).json(eqs)
}

exports.addEquipe = async (req, res) => {
    const { nome } = req.body

    const novaEquipe = await Equipe.create({nome})
    return res.status(201).json(novaEquipe)
}