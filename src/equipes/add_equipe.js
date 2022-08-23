const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')
const multer = require('multer');
const multerConfig = require('../../cmd/multer');
const { s3Uploadv2 } = require("../../cmd/s3Service.js");

//Inserindo equipes
equipes.post('/equipes', authenticateToken, multer(multerConfig).single('foto'), async (req, res) => { 
    const body = req.body

    if (body.eq_nome === "" || !body.eq_nome) {
        return res.status(400).json('Nome Inválido')
    }

    
    if (req.file) {
        var result = await s3Uploadv2(req.file)
        console.log(result)
    }   

    // cadastrando a equipe
    cliente.query('INSERT INTO equipes (eq_nome, eq_foto) values ($1, $2)', [body.eq_nome, result.Location])

    // Pegando o id da equipe que acabou de ser cadastrada
    const id = await cliente
                        .query('select max(eq_id) from equipes')
                        .catch(e => {                           
                            return res.status(400).json(e)
                        })


    // Colocando as pessoas na equipe
    if (body.pessoas) {
        body.pessoas.forEach(async p => {
            const idPessoa = await cliente.query(`select pe_id from pessoas where pe_nome = $1`, [p])
            cliente
                .query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoa, fk_equipe)
                        VALUES ($1, $2)`, [idPessoa.rows[0].pe_id, id.rows[0].max])
                .catch(e => {                
                    return res.status(400).json(e)
                })
        });
    }

    return res.json(result)
})

module.exports = equipes