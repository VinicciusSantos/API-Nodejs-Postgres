const EquipePessoa = require('../../infra/equipePessoa/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')
const Pessoa = require('../../infra/pessoa/sequelize/data')

exports.VerificaEquipe = async (equipe) => {
    try {
         // Verificando a existência da equipe
         const eq = await Equipe.BuscarPorId(equipe)
         if (!eq) throw new Error(`Equipe ${equipe} não encontrada`)
         return eq
    } catch (error) {
        throw new Error(error)
    }
}

exports.getPessoas = async (equipe) => {
    try {
        const eq = await this.VerificaEquipe(equipe)
        const listaPessoas = await Pessoa.BuscarPessoas()
        let listaIDs = await EquipePessoa.GetPessoas(equipe)

        listaIDs = listaIDs.map(id => { return id.pessoaId })
        return listaPessoas.filter(pe => listaIDs.includes(pe.id))
    } catch (error) {
        throw new Error(error)
    }
}

exports.AssociaEquipePessoas = async (equipe, pessoas) => {
    try {
        // Verificando a existência da equipe
        const eq = await this.VerificaEquipe(equipe)
        
        // Fazendo a busca de todas as pessoas para na hora da associação ter certeza de
        // que uma equipe só será associada com pessoas que realmente existem
        const listaPessoas = await Pessoa.BuscarPessoas()
        let lista_IDs = listaPessoas?.map((p) => { return p.id })
        
        // Associando os id de pessoas com equipes
        // caso algum id inválido seja passado no meio dos válidos, ele será guardado
        // para que depois que todos os válidos sejam associados, retorne um alerta
        let listaInvalidos = pessoas?.map((p) => {
            if (!lista_IDs.includes(p.id)) return p.id
            else EquipePessoa.AssociaEquipePessoa(eq.dataValues.id, p.id)
        }).filter(id => id)

        // Retornando uma Mensagem avisando caso alguma pessoa não tenha sido associada
        if (listaInvalidos.length > 0) 
        throw new Error(`As pessoas: '${listaInvalidos.toString().replace(",", "', '")}' não foram adicionadas!`)

    } catch (error) {
        throw new Error(error)
    }
}