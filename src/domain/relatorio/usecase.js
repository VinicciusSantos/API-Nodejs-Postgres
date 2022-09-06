const Relatorio = require('../../infra/relatorio/sequelize/data.js')
const Pessoa = require('../../infra/pessoa/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')

exports.relProjetos = async () => {
    try {
        const rel = await Relatorio.relProjetos()

        if (rel[0].length === 0){
            return Relatorio.RetornaDataAtual()
        } 

        return rel
    } catch (error) {
        throw new Error(error)
    }
}

exports.relEquipe = async (id) => {
    try {
        // Verificando se a Equipe existe
        const eq = await Equipe.BuscarPorId(id)
        if (!eq) throw new Error(`Equipe ${id} não encontrada!`) 

        const rel = await Relatorio.relEquipe(id)
        if (rel[0].length === 0){
            throw new Error("Não foi possível fazer a busca")
        } 
        return rel
    } catch (error) {
        throw new Error(error)
    }
}

exports.relPessoa = async (id) => {
    try {
        // Verificando se a pessoa existe
        const pe = await Pessoa.BuscarPorId(id)
        if (!pe) throw new Error(`Pessoa ${id} não encontrada!`) 

        // Verificando se a pessoa tem tarefas finalizadas para gerar o relatório
        const qtd = await Relatorio.verificaTarefasFinalizadas(id)
        if (qtd[0][0].count == 0 || !qtd) {
            return Relatorio.RetornaDataAtual()
        }

        const rel = await Relatorio.relPessoa(id)
        return rel
    } catch (error) {
        throw new Error(error)
    }
}