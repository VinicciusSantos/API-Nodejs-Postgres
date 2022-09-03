const Pessoa = require('../../infra/pessoa/sequelize/data')

exports.NovaPessoa = async (pessoaNova) => {
    return await Pessoa.NovaPessoa(pessoaNova)
}

exports.BuscarPessoas = async () => {
    const pes = await Pessoa.BuscarPessoas()
    if (pes.length === 0) throw new Error(`Nenhuma Pessoa Encontrada`)
    return pes
}

exports.BuscarPorId = async (id) => {
    try {
        const pe = await Pessoa.BuscarPorId(id)
        if (!pe) throw new Error(`Pessoa ${id} não foi encontrada`)
        return pe
    } catch (err) {
        throw new Error(err)
    }
}

exports.Edit = async (id, pessoa) => {
    try {
        await Pessoa.Edit(id, pessoa)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const pe = await this.BuscarPorId(id)
        if (!pe) throw new Error(`Pessoa ${id} não encontrada`)
        await Pessoa.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.getCargos = async () => {
    try {
        return Pessoa.getCargos()
    } catch (error) {
        throw new Error(error)
    }
}