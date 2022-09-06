const Lembrete = require('../../infra/lembrete/sequelize/data')

exports.BuscarPorId = async (id) => {
    try {
        const le = await Lembrete.BuscarPorId(id)
        if (!le) throw new Error(`Lembrete ${id} não foi encontrado`)
        return le
    } catch (error) {
        throw new Error(error)
    }
}

exports.NovoLembrete = async (NovoLembrete) => {
    try {
        return Lembrete.NovoLembrete(NovoLembrete)
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarLembretes = async () => {
    try {
        const lem = await Lembrete.BuscarLembretes()
        // if (lem.length === 0) throw new Error(`Nenhum Lembrete Encontrado`)
        return lem
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const pe = await this.BuscarPorId(id)
        if (!pe) throw new Error(`Lembrete ${id} não encontrado`)
        await Lembrete.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}
