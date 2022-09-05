const PessoaTarefa = require(`../../infra/pessoaTarefa/sequelize/data`)
const Pessoa = require(`../../infra/pessoa/sequelize/data`)
const Tarefa = require(`../../infra/tarefa/sequelize/data`)

exports.VinculaPessoaTarefa = async (pes, tr) => {
    try {
        // Verificando se a pessoa existe
        const checkTr = await Tarefa.BuscarPorId(tr)
        if (!checkTr) throw new Error(`Tarefa ${tr} não encontrada`)

        if (!pes) return
        let listaPessoas = await Pessoa.BuscarPessoas()
        listaPessoas = listaPessoas.map(pe => pe.id)

        let listaInvalidos = await Promise.all( pes?.map(async pe => {
            if (!listaPessoas.includes(pe.id)) { return pe.id }
            else await PessoaTarefa.VinculaPessoaTarefa(pe.id, tr)
        }) )

        // Associando a tarefa com a pessoa
        listaInvalidos = listaInvalidos.filter(i => i)
        if (listaInvalidos.length === 0) return Tarefa.BuscarPorId(tr)

        throw new Error(`As pessoas: '${listaInvalidos.toString().replace(",", "', '")}' não foram associadas'`)

    } catch (error) {
        throw new Error(error)
    }
}