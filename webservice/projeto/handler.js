const Projeto = require('../../domain/Projeto/usecase')
const ModelApresentacao = require('../../domain/projeto/model/model')

exports.NovoProjeto = async (req, res) => {
    const { nome, descricao } = req.body
    let ProjetoNovo = new ModelApresentacao(nome, descricao)

    try {
        const novosDados = await Projeto.NovoProjeto(ProjetoNovo)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível cadastrar a Projeto", error: error.message})
    }
}

exports.BuscarProjetos = async (req, res) => {
    try {
        const todosProjetos = await Projeto.BuscarProjetos()
        return res.status(200).json({message: "Retornando todas as Projetos com sucesso", data: todosProjetos})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as Projetos", error: error.message})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const pe = await Projeto.BuscarPorId(id)
        return res.status(200).json({message: "Retornando o Projeto com sucesso", data: pe})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar Projeto", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, descricao } = req.body
    let projetoRecebido = new ModelApresentacao(nome, descricao)

    try {
        const editada = await Projeto.Edit(id, projetoRecebido)
        return res.status(200).json({message: `Editado com Sucesso!`, data: editada})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Editar Projeto", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Projeto.Delete(id)
        return res.status(200).json({message: `Projeto ${id} Removido com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar Projeto", error: error.message})
    }
}
