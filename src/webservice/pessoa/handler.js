const Pessoa = require('../../domain/pessoa/usecase')
const PessoaTarefa = require('../../domain/pessoaTarefa/usecase')
const ModelApresentacao = require('../../domain/pessoa/model/model')
const { s3Uploadv2 } = require("../../middlewares/s3Service");

exports.NovaPessoa = async (req, res) => {
    
    const { nome, nascimento, cargo, salario } = req.body
    let pessoaNova = new ModelApresentacao(nome, nascimento, cargo, salario)
    
    try {
        // Verificando se um arquivo de foto foi recebido
        if (req.file){
            var result = await s3Uploadv2(req.file)
            pessoaNova.foto = result.Location
        } 

        const novosDados = await Pessoa.NovaPessoa(pessoaNova)
        return res.status(201).json({message: "Criado com Sucesso", data: novosDados})
    } catch (error) {
        return res.status(400).json({message: "Não Foi possível cadastrar a Pessoa", error: error.message})
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
    const { nome, nascimento, salario, cargo } = req.body
    let pessoaNova = new ModelApresentacao(nome, nascimento, cargo, salario)

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

exports.BuscarCargos = async (req, res) => {
    try {
        const cargos = await Pessoa.getCargos()
        return res.status(200).json({message: `${cargos.length} cargos encontrados!`, data: cargos})
    } catch (error) {
        return res.status(400).json({message: "Erro ao Buscar cargos!", error: error.message})
    }
}

exports.BuscarPeloCargo = async (req, res) => {
    const { cargo } = req.params

    try {
        const pessoas = await Pessoa.getByCargos(cargo)
        return res.status(200).json({message: `Mostrando pessoas com o cargo: ${cargo}`, data: pessoas})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

exports.VinculaPessoaTarefa = async (req, res) => {
    const { pe, tr } = req.params

    try {
        const vinculo = await PessoaTarefa.VinculaPessoaTarefa([{id: parseInt(pe)}], tr)
        return res.status(200).json({ message: `Pessoa ${pe} vinculada com a tarefa ${tr}!`, data: vinculo })
    } catch (error) {
        return res.status(400).json({ message: `Não foi possivel vincular a tarefa ${tr} com a pessoa ${pe}`, error: error.message })
    }
}
