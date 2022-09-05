const express = require('express')
const user = express.Router()
const cliente = require('../../cmd/database/connection.js')
const bcrypt = require('bcrypt')

//Inserindo Tarefas
user.post('/cadastro', async (req, res) => {
    let { nome, email, senha, confirmacao } = req.body

    if (!nome || !senha || !email || !confirmacao)
    return res.status(400).json(`Valores Obrigatórios não recebidos`)
    
    if (senha !== confirmacao) return res.status(401).json(`As senhas não batem`)
    
    let hashedPassword = await bcrypt.hash(senha, 10)

    const lista_usuarios = await cliente
                                    .query(`SELECT * FROM users WHERE email = $1`, [email])
                                    .catch(e => {                                  
                                        return res.status(400).json(e)
                                    })

    if (lista_usuarios.rows.length > 0) {
        return res.status(400).json(`Esse email já foi cadastrado`)
    }

    const cadastro = await cliente
                                .query(`INSERT INTO users (nome, senha, email) VALUES ($1, $2, $3) RETURNING id, nome, email`, [nome, hashedPassword, email])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })

    return res.status(200).json(`Usuário Cadastrado, Por Favor, faça Login`)
})

module.exports = user
