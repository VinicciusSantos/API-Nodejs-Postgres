const Pessoa = require('../../infra/pessoa/sequelize/data')
const Tarefa = require('../../infra/tarefa/sequelize/data')

exports.NovaPessoa = async (pessoaNova) => {
    return await Pessoa.NovaPessoa(pessoaNova)
}

exports.BuscarPessoas = async () => {
    const pes = await Pessoa.BuscarPessoas()
    // if (pes.length === 0) throw new Error(`Nenhuma Pessoa Encontrada`)
    return pes
}

exports.BuscarPorId = async (id) => {
    try {
        const pe = await Pessoa.BuscarPorId(id)
        const tarefas = await Tarefa.BuscarTarefasPessoa(id)
        const projetos = await Pessoa.getProjetosDaPessoa(id)
        pe.dataValues.projetos = projetos[0]
        pe.dataValues.tarefas = {}

        pe.dataValues.tarefas.NaoIniciadas = tarefas[0].filter((t) => t.status == "Não Iniciada")
        pe.dataValues.tarefas.EmDesenvolvimento = tarefas[0].filter((t) => t.status == "Em Desenvolvimento")
        pe.dataValues.tarefas.Testes = tarefas[0].filter((t) => t.status == "Em Testes")
        pe.dataValues.tarefas.Concluidas = tarefas[0].filter((t) => t.status == "Concluido")
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

exports.getByCargos = async(cargo) => {
    try {
        const pessoas = await Pessoa.getByCargos(cargo)
        if (pessoas.length === 0) throw new Error(`Nenhuma pessoa Encontrada com o cargo ${cargo}`)
        return pessoas
    } catch (error) {
        throw new Error(error)
    }
}