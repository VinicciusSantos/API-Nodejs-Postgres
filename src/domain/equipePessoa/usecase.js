const EquipePessoa = require('../../infra/equipePessoa/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')
const Pessoa = require('../../infra/pessoa/sequelize/data')

exports.AssociaEquipePessoas = async (equipe, pessoas) => {
    try {
        // Verificando a existência da equipe
        const eq = await Equipe.BuscarPorId(equipe)
         if (!eq) throw new Error(`Equipe ${equipe} não encontrada`)
        
        // Fazendo a busca de todas as pessoas para na hora da associação ter certeza de
        // que uma equipe só será associada com pessoas que realmente existem
        const listaPessoas = await Pessoa.BuscarPessoas()
        let lista_IDs = listaPessoas?.map((p) => { return p.id })
        
        // Associando os id de pessoas com equipes
        // caso algum id inválido seja passado no meio dos válidos, ele será guardado
        // para que depois que todos os válidos sejam associados, retorne um alerta
        let listaInvalidos = await Promise.all( pessoas?.map(async (p) => {
            if (!lista_IDs.includes(p.id)) return p.id
            else try {
                await EquipePessoa.AssociaEquipePessoa(equipe, p.id)
            } catch (err) { console.log(err) }
        }))

        listaInvalidos = listaInvalidos.filter(eq => eq)
        if (listaInvalidos.length === 0) return Equipe.BuscarPorId(equipe)
        
        // Retornando uma Mensagem avisando caso alguma pessoa não tenha sido associada
        const listaInvalidosString = `'${listaInvalidos.filter(eq => eq).toString().replace(",", "', '")}'`
        throw new Error(`As pessoas: ${listaInvalidosString} não foram adicionadas!`)
    } catch (error) {
        throw new Error(error)
    }
}