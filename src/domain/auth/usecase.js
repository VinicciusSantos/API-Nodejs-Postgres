const Usuario = require('../../infra/usuario/sequelize/data.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Cadastro = async (newUser) => {
    try {
        // validando as informações de senha
        if (newUser.senha !== newUser.confirmacao) throw new Error(`As senhas não batem`)

        // Codificando a senha para ser gravada no banco
        newUser.senha = await bcrypt.hash(newUser.senha, 10)

        return Usuario.Cadastro(newUser)
    } catch (error) {
       throw new Error(error)
    }
}

exports.Login = async (email, senha) => {
    try {
        // Verificando se os dados foram recebidos
        if (!email || !senha) throw new Error(`Dados Obrigatórios não fornecidos`)

        // Verificando se existe um usuario com o email fornecido
        const user = await Usuario.BuscarUm(email)
        if (!user) throw new Error(`Email ou Senha Inválidos!`)

        console.log(user.senha)
        // Verificando se a senha que ele passou está correta e gerando um token caso afirmativo
        const validPassword = await bcrypt.compare(senha, user.senha)
        if (validPassword) {
            return jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: '5h'
            });
        } else throw new Error(` Email ou Senha Inválidos!`)
    } catch (error) {
       throw new Error(error)
    }
}
