const Projeto = require('../../domain/projeto/usecase')
const ProjetoEquipe = require('../../domain/projetoEquipe/usecase')
const ProjetoTarefa = require('../../domain/projetoTarefa/usecase')
const EquipePessoa = require('../../domain/equipePessoa/usecase')
const ModelApresentacao = require('../../domain/projeto/model/model')

exports.NovoProjeto = async (req, res) => {
    const { nome, descricao, equipes } = req.body
    let ProjetoNovo = new ModelApresentacao(nome, descricao)

    try {
        const novosDados = await Projeto.NovoProjeto(ProjetoNovo)
        const eqs = await ProjetoEquipe.Associar(novosDados.dataValues.id, equipes)
        
        return res.status(201).json({message: "Criado com Sucesso", data: eqs })
    } catch (error) {

        // Verificando se o nome passado está duplicado
        const pr = await Projeto.BuscarPorNome(nome)
        if (pr) return res.status(400).json({message: `Já existe um projeto com esse nome: (#${pr.id} - ${pr.nome})`})

        // Mensagem Genérica
        return res.status(400).json({message: error.message})
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
        const pr = await Projeto.BuscarPorId(id)
        return res.status(200).json({ message: "Retornando o Projeto com sucesso", data: pr })
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

exports.VerStatus = async (req, res) => {
    try {
        const status = await Projeto.VerStatus()
        return res.status(200).json({message: "Status de projetos obtidos com sucesso", data: status})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar status", error: error.message})
    }
}

exports.MudarStatus = async (req,res) => {
    const { id, status } = req.params

    try {
        const updated = await Projeto.MudarStatus(id, status)
        return res.status(200).json({message: "Status de projetos alterado com sucesso", data: updated})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Atualizar status", error: error.message})
    }
}

exports.BuscarPorStatus = async(req, res) => {
    const { status } = req.params
    try {
        const projetosComOStatus = await Projeto.BuscarPorStatus(status)
        return res.status(200).json({message: `${projetosComOStatus.length} Projetos com o status '${status}' foram encontrados!`, data: projetosComOStatus})
    } catch (error) {
        return res.status(400).json({message: "Erro ao filtrar projetos por status", error: error.message})
    }
}

exports.VincularProjetoTarefa = async(req, res) => {
    const { pr, tr } = req.params
    try {
        const vinculo = await ProjetoTarefa.VincularProjetoTarefa(pr, tr)
        return res.status(201).json({message: `Projeto ${pr} foi vinculado com a tarefa ${tr}`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao vincular Projeto e Tarefa", error: error.message})
    }
}