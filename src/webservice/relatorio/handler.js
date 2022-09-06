const Relatorio = require('../../domain/relatorio/usecase.js')

exports.relProjetos = async (req, res) => {
    try {
        const dados = await Relatorio.relProjetos()  
        return res.status(200).json({message: `Relatório de projetos gerado com sucesso!`, data: dados[0]})
    } catch (error) {
        return res.status(400).json({message: "Não foi possível gerar o relatório", error: error.message})
    }
}

exports.relEquipe = async (req, res) => {
    const { id } = req.params 
    try {
        const dados = await Relatorio.relEquipe(id)  
        return res.status(200).json({message: `Relatório da Equipe ${id} gerado com sucesso!`, data: dados[0]})
    } catch (error) {
        return res.status(400).json({message: "Não foi possível gerar o relatório", error: error.message})
    }
}

exports.relPessoa = async (req, res) => {
    const { id } = req.params
    try {
        const dados = await Relatorio.relPessoa(id)  
        return res.status(200).json({message: `Relatório da Pessoa ${id} gerado com sucesso`, data: dados[0]})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}