const Equipe = require('../model/model')

exports.NovaEquipe = async (EquipeNova) => {

    return await Equipe
                    .create(EquipeNova)
                    .catch(err => { console.error(err) })

}

exports.BuscarEquipes = async () => {
    return await Equipe.findAll()
}