const Projeto = require('../../infra/projeto/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')
const ProjetoEquipe = require('../../infra/projetoEquipe/sequelize/data')

exports.GetEquipes = async (projeto) => {
    try {
        const todas_equipes =  await Equipe.BuscarEquipes()
        const ids_equipes = await ProjetoEquipe.GetIdEquipes(projeto)
        
        // Gravando somente os ids das equipes na lista results
        const results = ids_equipes.map(eq => { return eq.dataValues.equipeId })
        
        // Com os Id's do array results, pegamos as outras informações das equipes
        return todas_equipes.filter(eq => 
            results.includes(eq.dataValues.id)
        ) 
    } catch (error) {
        throw new Error(error)
    }
}

exports.Associar = async (projeto, equipes) => {
    try {
        const checkPr = await Projeto.BuscarPorId(projeto)
        if (!checkPr) throw new Error(1) // Projeto não encontrado!`

        // Criando uma lista com os IDs de equipes para validar se a equipe associada existe
        const ids_equipes = await Equipe.BuscarCampos(['id'])
        const results = ids_equipes.map(eq => { return eq.dataValues.id })
        
        // Se uma equipe passada não existir, ela não será associada com o projeto
        let NaoExistentes = equipes.map( eq => {
            if (!results.includes(eq.id)) return eq.nome
            else ProjetoEquipe.Associar(projeto, eq.id)
        }).filter(eq => eq);

        if (NaoExistentes.length > 0)
            throw new Error(`${NaoExistentes.length} equipes não foram adicionadas: '${NaoExistentes.toString().replace(",", "', '")}'`)
    } catch (error) {
        throw new Error(error)
    }
}
