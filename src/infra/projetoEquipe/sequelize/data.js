const ProjetoEquipe = require('../model/model')
const Equipe = require('../../equipe/model/model')

exports.GetIdEquipes = async (projeto) => {
    return ProjetoEquipe.findAll({ 
                                attributes: ["equipeId"],
                                where: { projetoId: projeto }
                            })
}

exports.Associar = async (projeto, equipe) => {
    return ProjetoEquipe.create({projetoId: projeto, equipeId: equipe})
}