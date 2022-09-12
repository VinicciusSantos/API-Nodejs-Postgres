const sequelize = require('sequelize')
const Pessoa = require('../model/model')
const db = require('../../../config/database/dbpostgres')
const Equipe = require('../../equipe/model/model')

exports.NovaPessoa = (pessoa) => {
    return Pessoa.create(pessoa)
}

exports.BuscarPessoas = () => {
    return Pessoa.findAll()
}

exports.BuscarPorId = (id) => {
    return Pessoa.findOne({
        include: [{ model: Equipe }],
        where: { id: id }
    })
}

exports.Edit = (id, pessoa) => {
    return Pessoa.update(pessoa, { where: { id: id }})
}

exports.Delete = (id) => {
    return Pessoa.destroy({ where: { id: id }})
}

exports.getCargos = () => {
    return Pessoa.findAll({
        attributes: ['cargo', [sequelize.fn('COUNT', '*'), 'count']],
        group: ['cargo']
    })
}

exports.getByCargos = (cargo) => {
    return Pessoa.findAll({ where: { cargo: { [sequelize.Op.iLike]: cargo } } })
}

exports.getProjetosDaPessoa = (id) => {
    return db.query(`SELECT pr.* FROM projetos AS pr
                     INNER JOIN "projetoEquipes" AS ppe ON ppe."projetoId" = pr.id
                     INNER JOIN equipes AS eq ON eq.id = ppe."equipeId"
                     INNER JOIN "equipePessoas" as ppeq on ppeq."equipeId" = eq.id
                     INNER JOIN pessoas AS pe ON pe.id = ppeq."pessoaId"
                     WHERE pe.id = ${id}`)
}