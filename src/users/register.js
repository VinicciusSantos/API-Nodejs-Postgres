const express = require('express')
const user = express.Router()
const cliente = require('../../cmd/database/connection.js')
const bcrypt = require('bcrypt')

//Inserindo Tarefas
user.post('/cadastro', async (req, res) => {
    let { usuario, senha } = req.body

    if (!usuario || !senha)
        return res.status(400).json(`Valores Obrigatórios não recebidos`)

    let hashedPassword = await bcrypt.hash(senha, 10)

    const lista_usuarios = await cliente
                                    .query(`SELECT * FROM users WHERE usuario = $1`, [usuario])
                                    .catch(e => {                                  
                                        return res.status(400).json(e)
                                    })

    if (lista_usuarios.rows.length > 0) {
        return res.status(400).json(`Esse nome de Usuário Já Existe`)
    }

    const cadastro = await cliente
                                .query(`INSERT INTO users (usuario, senha) VALUES ($1, $2) RETURNING id, senha`, [usuario, hashedPassword])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })

    return res.status(200).json(`Usuário Cadastrado, Por Favor, faça Login`)
})

module.exports = user
