require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const user = express.Router()
const cliente = require('../../cmd/database/connection.js')
const bcrypt = require('bcrypt')

//Inserindo Tarefas
user.post('/login', async (req, res) => {
    let { usuario, senha } = req.body

    if (!usuario || !senha)
        return res.status(400).json(`Valores Obrigatórios não recebidos`)

    const user = await cliente
                            .query(`SELECT * FROM users WHERE usuario = $1`, [usuario])
                            .catch(e => {                                  
                                return res.status(400).json(e)
                            })
    
    if (user.rowCount == 0) {
        return res.status(404).json({ message: "Usuário Não Encontrado" });
    }

    const validPassword = await bcrypt.compare(senha, user.rows[0].senha);
    if (validPassword) {
        const id = user.rows[0].id
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 18000 // expires in 15min
        });
        return res.status(200).json({ auth: true, token: token });
    } else {
        res.status(401).json({ auth: false });
    }
})

module.exports = user