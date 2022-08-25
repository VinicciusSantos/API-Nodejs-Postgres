const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

//Inserindo equipes
equipes.post('/equipes', authenticateToken, async (req, res) => { 
    const body = req.body

    if (body.eq_nome === "" || !body.eq_nome) {
        return res.status(400).json('Nome Inválido')
    }

    // cadastrando a equipe
    const id = await cliente
                    .query(`INSERT INTO equipes (eq_nome, eq_foto) 
                            values ($1, $2)
                            RETURNING eq_id`, [body.eq_nome, body.eq_foto])
                    .catch(e => {                           
                        return res.status(400).json(e)
                    })

    console.log(`Body: ${body}`)

    // Colocando as pessoas na equipe
    if (body.pessoas) {
        body.pessoas.forEach(async p => {
            const idPessoa = await cliente.query(`select pe_id from pessoas where pe_nome = $1`, [p])
            cliente
                .query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoa, fk_equipe)
                        VALUES ($1, $2)`, [idPessoa.rows[0].pe_id, id.rows[0].eq_id])
                .catch(e => {                
                    return res.status(400).json(e)
                })
        });
    }

    return res.status(201).json({message: "Criado"})
})

module.exports = equipes