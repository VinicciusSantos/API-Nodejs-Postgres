const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')

// Editando equipes
equipes.put('/equipes/:id', async (req, res) => { 
    const id = req.params.id
    const body = req.body

    // Verificando a existencia da equipe
    try {
        var dados = await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id])
    } catch (err) {
        return res.status(400).send(err)
    }

    if (dados.rowCount == 0) return res.status(404).json(`Equipe ${id} não encontrada`)

    const lista_pessoas = await cliente
                                    .query(`SELECT * FROM pessoas AS pe
                                            INNER JOIN pessoas_pertencem_equipes AS pat ON pat.fk_pessoa = pe.pe_id
                                            INNER JOIN equipes AS eq ON eq.eq_id = pat.fk_equipe
                                            WHERE eq.eq_id = $1`, [id])

    cliente
        .query('UPDATE equipes SET eq_nome = $1 WHERE eq_id = $2', [body.eq_nome, id])
        .catch(e => {         
            return res.status(400).json(e)
        })

    if (body.pessoas) {
        lista_pessoas.rows.forEach(async p => {
            await cliente.query(`DELETE FROM pessoas_pertencem_equipes WHERE fk_pessoa = $1`, [p.pe_id])
        })

        body.pessoas.forEach(async p =>{
            await cliente.query(`INSERT INTO pessoas_pertencem_equipes (fk_pessoa, fk_equipe) VALUES ($1, $2)`, [p.pe_id, id])
        })
    }
    return res.json("Alterado com sucesso!")
})

module.exports = equipes