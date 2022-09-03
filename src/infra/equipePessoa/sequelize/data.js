const EquipePessoa = require('../model/model')

exports.AssociaEquipePessoa = (equipe, pessoa) => {
    return EquipePessoa.create({equipeId: equipe, pessoaId: pessoa})
}

exports.GetPessoas = (equipe) => {
    return EquipePessoa.findAll({ where: { equipeId: equipe} })
}