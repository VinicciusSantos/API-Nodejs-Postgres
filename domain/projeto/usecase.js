const Projeto = require('../../infra/projeto/sequelize/data')

exports.NovoProjeto = async (NovoProjeto) => {
    return await Projeto.NovoProjeto(NovoProjeto)
}

exports.BuscarProjetos = async () => {
    const prs = await Projeto.BuscarProjetos()
    if (prs.length === 0) throw new Error(`Nenhum Projeto Encontrado`)
    return prs
}

exports.BuscarPorId = async (id) => {
    try {
        const pr = await Projeto.BuscarPorId(id)
        if (!pr) throw new Error(`Projeto ${id} não foi encontrado`)
        return pr
    } catch (err) {
        throw new Error(err)
    }
}

exports.Edit = async (id, projeto) => {
    try {
        await Projeto.Edit(id, projeto)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        await Projeto.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}