const express = require('express')
const projetos = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Deletando projetos
projetos.delete('/projetos/:id', authenticateToken, async (req, res) => { 
    const id = req.params.id
    
    // Verificando se o id que foi passado como parâmetro é realmente um número
    if (isNaN(parseInt(id)) || id == null){
        return res.status(400).json(`Id: ${id} é Inválido`)
    }

    // Recebendo as informações basicas do projeto, como: nome, descrição...
    const dados_projeto = await cliente
                                        .query('SELECT * FROM projetos WHERE pr_id = $1', [id])
                                        .catch(e => {                                           
                                            return res.status(400).json(e)
                                        })

    // Se o id for válido mas não existir nenhum projeto com esse id, as resposta de dados_projeto terá rowCount == 0, e retornamos um erro
    if(dados_projeto.rowCount == 0){
        return res.status(404).json(`Projeto '${id}' não encontrado!`)
    }

    cliente
        .query('DELETE FROM projetos WHERE pr_id = $1', [id])
        .catch(e => {
            return res.status(400).json(e)
        })
    return res.status(204).json("Deletado com sucesso!")
})

module.exports = projetos