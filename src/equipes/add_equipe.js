const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

//Inserindo equipes
equipes.post('/equipes', async (req, res) => { 
    const body = req.body

    // cadastrando a equipe
    cliente.query('INSERT INTO equipes (eq_nome) values ($1)', [body.eq_nome])

    const pessoas = await cliente
                                .query(`select pe_nome, pe_id from pessoas`)
                                .catch(e => {
                                    
                                    return res.status(400).json(e)
                                })

    // Pegando o id da equipe que acabou de ser cadastrada
    const id = await cliente
                        .query('select max(eq_id) from equipes')
                        .catch(e => {
                            
                            return res.status(400).json(e)
                        })


    // Colocando as pessoas na equipe
    body.pessoas.forEach(async p => {
        const idPessoa = await cliente.query(`select pe_id from pessoas where pe_nome = $1`, [p])
        cliente
            .query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoa, fk_equipe)
                    VALUES ($1, $2)`, [idPessoa.rows[0].pe_id, id.rows[0].max])
            .catch(e => {
                
                return res.status(400).json(e)
            })
    });

    return res.json("Inserido com sucesso!")
})

module.exports = equipes