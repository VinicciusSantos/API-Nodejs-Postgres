const Equipe = require('../../infra/equipe/sequelize/data')

exports.NovaEquipe = async (NovaEquipe) => {
    NovaEquipe.nome = `Equipe: ${NovaEquipe.nome}`
    return await Equipe.NovaEquipe(NovaEquipe)
}

exports.BuscarEquipes = async () => {
    const eqs = await Equipe.BuscarEquipes()
    if (eqs.length === 0) throw new Error(`Nenhuma Equipe Encontrada`)
    return eqs
}

exports.BuscarPorId = async (id) => {
    try {
        const eq = await Equipe.BuscarPorId(id)
        if (!eq) throw new Error(`Equipe ${id} não foi encontrada`)
        return eq
    } catch (err) {
        throw new Error(err)
    }
}

exports.Edit = async (id, equipe) => {
    try {
        await Equipe.Edit(id, equipe)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const eq = await this.BuscarPorId(id)
        if (!eq) throw new Error(`Equipe ${id} não encontrada`)
        await Equipe.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}