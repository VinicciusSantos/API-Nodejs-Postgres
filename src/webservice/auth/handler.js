const Auth = require('../../domain/auth/usecase.js')
const ModelApresentacao = require('../../domain/auth/model/model.js')

exports.Cadastro = async (req, res) => {
    const { nome, email, senha, confirmacao } = req.body
    const newUser = new ModelApresentacao(nome, email, senha, confirmacao)

    try {
        const cadastro = await Auth.Cadastro(newUser)  
        return res.status(201).json({message: `Pessoa cadastrada com sucesso!`, data: cadastro})
    } catch (error) {
        return res.status(400).json({message: "Não foi possível fazer o cadastro", error: error.message})
    }
}

exports.Login = async (req, res) => {
    const { email, senha } = req.body
    try {
        const login = await Auth.Login(email, senha)  
        return res.status(200).json({message: `Login Concluido!`, token: login, auth: true})
    } catch (error) {
        return res.status(400).json({message: "Não foi possível fazer login", error: error.message, auth: false})
    }
}
