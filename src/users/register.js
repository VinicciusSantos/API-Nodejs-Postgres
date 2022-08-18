const express = require('express')
const user = express.Router()
const cliente = require('../../cmd/database/connection.js')
const bcrypt = require('bcrypt')

//Inserindo Tarefas
user.post('/registro', async (req, res) => {
    let { nome, email, senha, confirmacao } = req.body

    if (!nome || !email || !senha || !confirmacao)
        return res.status(400).json(`Valores Obrigatórios não recebidos`)

    if (senha.length < 6)
        return res.status(400).json(`A Senha deve ter pelo menos 6 caracteres`)

    if (senha != confirmacao)
        return res.status(400).json(`As senhas não batem`)

    let hashedPassword = await bcrypt.hash(senha, 10)

    const lista_emails = await cliente
                                    .query(`SELECT * FROM users WHERE email = $1`, [email])
                                    .catch(e => {                                  
                                        return res.status(400).json(e)
                                    })

    if (lista_emails.rows.length > 0) {
        return res.status(400).json(`Esse Email já Foi cadastrado`)
    }

    const cadastro = await cliente
                                .query(`INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, senha`, [nome, email, senha])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })
    return res.status(200).json(`Ok`)
})

module.exports = user

/*
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	nome varchar(200) not null,
	email varchar(200) not null,
	senha varchar(200) not null,
	unique(email)
);

select * from users

alter table users
add column senha varchar(200) not null

INSERT INTO users (nome, email, senha) VALUES ('admin', 'admin@gmail.com', '123456')
delete from users*/