const ProjetoTarefa = require('../../projetoTarefa/model/model')

exports.VincularProjetoTarefa = (pr, tr) => {
    ProjetoTarefa.create({projetoId: pr, tarefaId: tr})
}