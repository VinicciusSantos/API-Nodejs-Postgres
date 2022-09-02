const Projeto = require('../../infra/projeto/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')
const ProjetoEquipe = require('../../infra/projetoEquipe/sequelize/data')

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
    try {
        const checkPr = await Projeto.BuscarPorId(projeto)
        if (!checkPr) throw new Error(`Projeto ${projeto} não encontrado!`) 

        // Criando uma lista com os IDs de equipes para validar se a equipe associada existe
        const ids_equipes = await Equipe.BuscarCampos(['id'])
        const results = []
        ids_equipes.forEach(eq => {
            results.push(eq.dataValues.id)
        })
        
        // Se uma equipe passada não existir, ela não será associada com o projeto
        let NaoExistentes = []
        equipes.forEach( eq => {
            if (results.includes(eq.id)) ProjetoEquipe.Associar(projeto, eq.id)
            else NaoExistentes.push(eq.nome)
        });

        if (NaoExistentes.length > 0)
            throw new Error(`${NaoExistentes.length} equipes não foram adicionadas: ${NaoExistentes}`)
    } catch (error) {
        throw new Error(error)
    }
}
