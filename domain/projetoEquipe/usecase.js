const ProjetoEquipe = require('../../infra/projetoEquipe/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')

exports.GetEquipes = async (projeto) => {
    const todas_equipes =  await Equipe.BuscarEquipes()
    const ids_equipes = await ProjetoEquipe.GetIdEquipes(projeto)

    // Gravando somente os ids das equipes na lista results
    const results = []
    ids_equipes.forEach(eq => {
        results.push(eq.dataValues.equipeId)
    })

    // Com os Id's do array results, pegamos as outras informações das equipes
    const equipesFiltradas = todas_equipes.filter(eq => 
        results.includes(eq.dataValues.id)
    )
    return equipesFiltradas
}

exports.Associar = async (projeto, equipes) => {
    equipes.forEach( eq => { ProjetoEquipe.Associar(projeto.dataValues.id, eq.id) });
}
