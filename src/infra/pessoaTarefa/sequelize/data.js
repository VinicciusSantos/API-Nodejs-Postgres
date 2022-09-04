const PessoaTarefa = require('../model/model')

exports.VinculaPessoaTarefa = async (pe, tr) => {
    return PessoaTarefa.create({ pessoaId: pe, tarefaId: tr })
}