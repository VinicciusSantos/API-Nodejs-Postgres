const Projeto = require('../../infra/projeto/sequelize/data')
const Tarefa = require('../../infra/tarefa/sequelize/data')
const ProjetoTarefa = require('../../infra/projetoTarefa/sequelize/data')

exports.VincularProjetoTarefa = async (pr, tr) => {
    try {
        const checkPr = await Projeto.BuscarPorId(pr)
        if (!checkPr) throw new Error(`Projeto ${pr} não encontrado`)
        const checkTr = await Tarefa.BuscarPorId(tr)
        if (!checkTr) throw new Error(`Tarefa ${tr} não encontrada`)

        ProjetoTarefa.VincularProjetoTarefa(pr, tr)
        return true
    } catch (error) {
        throw new Error(error)
    }
}