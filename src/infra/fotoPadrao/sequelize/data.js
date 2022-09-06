const FotosPadrao = require('../model/model')

exports.BuscarFotos = async () => {
    return FotosPadrao.findAll()
}

exports.AddFoto = async (link) => {
    return FotosPadrao.create({link})
}