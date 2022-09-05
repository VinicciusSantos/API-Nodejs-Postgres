const Lembrete = require('../../domain/lembrete/usecase')
const ModelApresentacao = require('../../domain/lembrete/model/model.js')

exports.NovoLembrete = async (req, res) => {
    const { descricao, data } = req.body
    let LembreteNovo = new ModelApresentacao(descricao, data)

    try {
        const novosDados = await Lembrete.NovoLembrete(LembreteNovo)
        return res.status(201).json({message: "Lembrete Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível criar o Lembrete", error: error.message})
    }
}

exports.BuscarLembretes = async (req, res) => {
    try {
        const todasLembretes = await Lembrete.BuscarLembretes()
        return res.status(200).json({message: "Retornando todos os Lembretes com sucesso", data: todasLembretes})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar os Lembretes", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Lembrete.Delete(id)
        return res.status(200).json({message: `Lembrete ${id} Removido com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar Lembrete", error: error.message})
    }
}
