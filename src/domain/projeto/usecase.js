const Projeto = require('../../infra/projeto/sequelize/data')

exports.NovoProjeto = async (NovoProjeto) => {
    try {
        return Projeto.NovoProjeto(NovoProjeto)
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarProjetos = async () => {
    try {
        const prs = await Projeto.BuscarProjetos()
        // if (prs.length === 0) throw new Error(`Nenhum Projeto Encontrado`)
        return prs
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarPorId = async (id) => {
    try {
        const pr = await Projeto.BuscarPorId(id)
        if (!pr) throw new Error(`Projeto ${id} não foi encontrado`)
        return pr
    } catch (error) {
        throw new Error(error)
    }
}

exports.Edit = async (id, projeto) => {
    try {
        const proj = await this.BuscarPorId(id)
        if (!proj) throw new Error(`Projeto ${id} não encontrado`)

        await Projeto.Edit(id, projeto)
        return this.BuscarPorId(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete = async (id) => {
    try {
        const pe = await this.BuscarPorId(id)
        if (!pe) throw new Error(`Projeto ${id} não encontrado`)
        await Projeto.Delete(id)
    } catch (error) {
        throw new Error(error)
    }
}

exports.VerStatus = async () => {
    try {
        const status = await Projeto.VerStatus()
        // if (status.length === 0) throw new Error("Nenhum Status Cadastrado")
        return status
    } catch (error) {
        throw new Error(error)
    }
}

exports.MudarStatus = async (id, status) => {
    try {
        const proj = this.BuscarPorId(id)
        proj.status = status
        return this.Edit(id, proj)
    } catch (error) {
        throw new Error(error)
    }
}

exports.BuscarPorStatus = async (status) => {
    try {
        const projetosFiltrados = await Projeto.BuscarPorStatus(status)
        if (projetosFiltrados.length === 0) throw new Error(`Nenhum projeto encontrado com o status ${status}`)
        return projetosFiltrados
    } catch (error) {
        throw new Error(error)
    }
}