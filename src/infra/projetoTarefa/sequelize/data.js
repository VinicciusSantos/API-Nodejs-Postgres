const ProjetoTarefa = require('../../projetoTarefa/model/model')

exports.VincularProjetoTarefa = (pr, tr) => {
    ProjetoTarefa.create({projetoId: pr, tarefaId: tr})
}

exports.BuscarTodos = () => {
    return ProjetoTarefa.findAll()
}

exports.BuscarDeProjeto = (pr) => {
    return ProjetoTarefa.findAll({ where: { projetoId: pr }})
}