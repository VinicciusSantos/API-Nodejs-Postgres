const express = require('express')
const equipes = express.Router()
var cliente = require('../../cmd/database/connection.js')
const authenticateToken = require('../../cmd/jwt')

// Mostrando equipes específicas pelo ID
equipes.get('/equipes/:id', authenticateToken, async (req, res) => { 
    const id = req.params.id

    // Recebendo todas as informações da equipe
    try {
        var dados = await cliente.query('SELECT * FROM equipes WHERE eq_id = $1', [id])
    } catch (err) {
        return res.status(400).send(err)
    }
    
    if (dados.rowCount == 0) return res.status(404).json(`Nenhuma Equipe Encontrada com o ID: ${id}`)

    const foto = await cliente 
                        .query(`SELECT * FROM fotos_padrao WHERE id = $1`, [dados.rows[0].eq_foto])
                        .catch(e => {                             
                            return res.status(400).json(e)
                        })

    const pessoas = await cliente
                        .query(`SELECT pe.* FROM equipes AS eq
                                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_equipe = eq.eq_id
                                INNER JOIN pessoas AS pe ON pe.pe_id = ppe.fk_pessoa
                                WHERE eq.eq_id = $1`, [id])
                        .catch(e => {                             
                            return res.status(400).json(e)
                        })

    const results = dados.rows[0]
    try {
        dados.rows[0].eq_foto = foto.rows[0].link
    } catch (error) {
        dados.rows[0].eq_foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv8yKLUE-rGAPYj41Bigfne3zUWW-TD0Z7A&usqp=CAU"
    }
    results.pessoas = pessoas.rows
    
    const tarefas = await cliente
                        .query(`SELECT tr.*, eq.eq_id, pe.pe_id FROM equipes AS eq
                                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_equipe = eq.eq_id
                                INNER JOIN pessoas AS pe ON pe.pe_id = ppe.fk_pessoa
                                INNER JOIN pessoas_associam_tarefas AS pat ON pat.fk_pessoa = pe.pe_id
                                INNER JOIN tarefas AS tr ON tr.tr_id = pat.fk_tarefa
                                WHERE eq.eq_id = $1`, [id])
                        .catch(e => {                             
                            return res.status(400).json(e)
                        })
    
    
    pessoas.rows.forEach((p, index) => {
        results.pessoas[index].tarefas = {}
        results.pessoas[index].tarefas.qtd = tarefas.rows.filter(t => t.pe_id == p.pe_id).length
        results.pessoas[index].tarefas.NaoIniciadas = tarefas.rows.filter(t => t.pe_id === p.pe_id && t.tr_status == "Não Iniciado")
        results.pessoas[index].tarefas.EmAndamento = tarefas.rows.filter(t => t.pe_id === p.pe_id && t.tr_status == "Em Desenvolvimento")
        results.pessoas[index].tarefas.EmTestes = tarefas.rows.filter(t => t.pe_id === p.pe_id && t.tr_status == "Em Testes")
        results.pessoas[index].tarefas.Concluidas = tarefas.rows.filter(t => t.pe_id === p.pe_id && t.tr_status == "Concluido")
    })

    results.tarefas = {}
    results.tarefas.total = tarefas.rowCount
    results.tarefas.NaoIniciadas = tarefas.rows.filter(t => t.tr_status == "Não Iniciado").length
    results.tarefas.EmAndamento = tarefas.rows.filter(t => t.tr_status == "Em Desenvolvimento").length
    results.tarefas.EmTestes = tarefas.rows.filter(t => t.tr_status == "Em Testes").length
    results.tarefas.Concluidas = tarefas.rows.filter(t => t.tr_status == "Concluido").length
    
    return res.status(200).json(results)
})

module.exports = equipes
