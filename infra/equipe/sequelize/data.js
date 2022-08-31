const Equipe = require('../model/model')

exports.NovaEquipe = async (EquipeNova) => {

    const response = await Equipe
                                .create(EquipeNova)
                                .catch(err => { console.error(err) })

    return response
}