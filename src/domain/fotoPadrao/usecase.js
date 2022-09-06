const FotosPadrao = require('../../infra/fotoPadrao/sequelize/data')

exports.BuscarFotos = async () => {
    try {
        return FotosPadrao.BuscarFotos()
    } catch (error) {
        throw new Error(error)
    }
}

exports.AddFoto = async (link) => {
    try {
        return FotosPadrao.AddFoto(link)
    } catch (error) {
        throw new Error(error)
    }
}