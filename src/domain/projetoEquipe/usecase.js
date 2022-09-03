const Projeto = require('../../infra/projeto/sequelize/data')
const Equipe = require('../../infra/equipe/sequelize/data')
const ProjetoEquipe = require('../../infra/projetoEquipe/sequelize/data')

exports.Associar = async (projeto, equipes) => {
    try {
        const checkPr = await Projeto.BuscarPorId(projeto)
        if (!checkPr) throw new Error(1) // Projeto não encontrado!`

        // Criando uma lista com os IDs de equipes para validar se a equipe associada existe
        const ids_equipes = await Equipe.BuscarCampos(['id'])
        const results = ids_equipes.map(eq => { return eq.dataValues.id })
        
        // Se uma equipe passada não existir, ela não será associada com o projeto
        let NaoExistentes = await Promise.all( equipes.map(async eq => {
            if (!results.includes(eq.id)) return eq.nome
            else await ProjetoEquipe.Associar(projeto, eq.id)
        }))
        
        NaoExistentes = NaoExistentes.filter(eq => eq);

        if (NaoExistentes.length > 0)
            throw new Error(`${NaoExistentes.length} equipes não foram adicionadas: '${NaoExistentes.toString().replace(",", "', '")}'`)

        return Projeto.BuscarPorId(projeto)
    } catch (error) {
        throw new Error(error)
    }
}
