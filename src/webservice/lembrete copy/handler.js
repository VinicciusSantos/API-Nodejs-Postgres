const Relatorio = require('../../domain/relatorio/usecase.js')

exports.relProjetos = async (req, res) => {
    try {
        const dados = await Relatorio.relProjetos()  
        return res.status(200).json({message: `Relatório Gerado com sucesso!`, data: dados})
    } catch (error) {
        return res.status(200).json({message: "Não foi possível gerar o relatório"})
    }
}

exports.relEquipe = async (req, res) => {
    const { id } = req.params 
    try {
        const dados = await Relatorio.relEquipe(id)  
        return res.status(200).json({message: `Relatório Gerado com sucesso!`, data: dados})
    } catch (error) {
        return res.status(200).json({message: "Não foi possível gerar o relatório"})
    }
}

exports.relPessoa = async (req, res) => {
    const { id } = req.params
    try {
        const dados = await Relatorio.relPessoa(id)  
    } catch (error) {
        return res.status(200).json({message: "Não foi possível gerar o relatório"})
    }
}