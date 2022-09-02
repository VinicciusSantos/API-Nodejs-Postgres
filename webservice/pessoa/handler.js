const Pessoa = require('../../domain/pessoa/usecase')
const ModelApresentacao = require('../../domain/pessoa/model/model')

exports.NovaPessoa = async (req, res) => {
    const { id } = req.params
    const { nome, nascimento, salario, foto } = req.body
    let pessoaNova = new ModelApresentacao(nome, nascimento, salario, foto)
    console.log(pessoaNova)

    try {
        const novosDados = await Pessoa.NovaPessoa(pessoaNova)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível cadastrar a Pessoa", error: error})
    }
}

exports.BuscarPessoas = async (req, res) => {
    try {
        const todasPessoas = await Pessoa.BuscarPessoas()
        return res.status(200).json({message: "Retornando todas as Pessoas com sucesso", data: todasPessoas})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar as Pessoas", error: error.message})
    }
}

exports.BuscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const pe = await Pessoa.BuscarPorId(id)
        return res.status(200).json({message: "Retornando a Pessoa com sucesso", data: pe})
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar Pessoa", error: error.message})
    }
}

exports.Edit = async (req, res) => {
    const { id } = req.params
    const { nome, nascimento, salario, foto } = req.body
    let pessoaNova = new ModelApresentacao(nome, nascimento, salario, foto)

    try {
        const editada = await Pessoa.Edit(id, pessoaNova)
        return res.status(200).json({message: `Editado com Sucesso!`, data: editada})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Editar Pessoa", error: error.message})
    }
}

exports.Delete = async (req, res) => {
    const { id } = req.params

    try {
        await Pessoa.Delete(id)
        return res.status(200).json({message: `Pessoa ${id} Removida com sucesso`})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Deletar Pessoa", error: error.message})
    }
}
