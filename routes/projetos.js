const express = require('express')
const projetos = express.Router()

const { Client } = require('pg');
const equipes = require('./equipes');

const cliente = new Client({
  connectionString: "postgres://vbqbxvwduupnpi:7126070db19f0b620bc80a0eb041e8067a9eaf9b568937002331f2eb3f51ffc8@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dcte0q2jbf9d90",
  ssl: {
    rejectUnauthorized: false
  }
})

cliente.connect()

// Mostrando todos os Projetos
projetos.get('/projetos', (req, res) => { 
    cliente
        .query(`SELECT * FROM projetos ORDER BY pr_id`)
        .then(results => {
        return res.json(results.rows)
    })
})

// Quantidade de projetos
projetos.get('/projetos/count', (req, res) => { 
    cliente
        .query("SELECT count(*) FROM projetos")
        .then(results => {
        return res.json(results.rows[0])
    })
})

// Mostrando todos os Status que estão sendo utilizados
projetos.get('/projetos/status', (req, res) => {
    cliente
        .query(`SELECT pr_status, count(*) FROM projetos GROUP BY pr_status`)
        .then(results => {
            return res.json(results.rows[0])
        })
})

// Mostrando projetos pelo ID
projetos.get('/projetos/:id', async (req, res) => { 
    const id = req.params.id

    // Recebendo as informações basicas do projeto, como: nome, descrição...
    const dados_projeto = await cliente.query('SELECT * FROM projetos WHERE pr_id = $1', [id])

    // Recebendo as tarefas do projeto
    const lista_tarefas = await cliente.query(`SELECT tr.tr_id, tr.tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_data_finalizacao FROM projetos AS pr
                                         INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.pr_id
                                         INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                                         WHERE pr.pr_id = $1`, [id])

    // Recebendo as equipes do projeto
    const lista_equipes = await cliente.query(`SELECT eq.eq_id, eq.eq_nome FROM projetos AS pr
                                         INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
                                         INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                                         WHERE pr.pr_id = $1
                                         ORDER BY pr.pr_id, eq.eq_id`, [id])

    // Montando um objeto para ser retornado no json
    let results = {
        dados: dados_projeto.rows[0],
        equipes: lista_equipes.rows,
        tarefas: lista_tarefas.rows
    }

    // Buscando as pessoas de cada equipe do projeto
    for (let i = 0; i < lista_equipes.rowCount; i++) {
        let element = lista_equipes.rows[i].eq_id;

        let pessoas_da_equipe = await cliente.query(`SELECT pe.pe_id, pe.pe_nome, ca.ca_cargo, eq.eq_nome FROM pessoas AS pe
                                                INNER JOIN pessoas_pertencem_equipes AS ppe ON ppe.fk_pessoa = pe.pe_id
                                                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                                                INNER JOIN cargos AS ca ON ca.ca_id = pe.pe_fk_cargo
                                                WHERE eq.eq_id = $1`, [element])
                                                
        // Gravando a lista de pessoas dentro do objeto results
        results.equipes[i].pessoas = pessoas_da_equipe.rows
    }

    return res.json(results)
})

// Inserindo projetos
projetos.post('/projetos', async (req, res) => { 
    const body = req.body

    const count = await cliente.query('SELECT count(*) from projetos where pr_nome = $1', [body.pr_nome])

    console.log(body.pr_nome)
    console.log(count.rows[0].count)
    if (count.rows[0].count == 0){
        cliente
            .query(`INSERT INTO projetos (pr_nome, pr_descricao, pr_data_criacao, pr_status)
                    VALUES ($1, $2, current_date, $3)`, [body.pr_nome, body.pr_descricao, 'Ativo'])
        return res.json("Inserido com sucesso!")
    }
    
    return res.status(400).json("Esse projeto já foi inserido!")
})

// Deletando projetos
projetos.delete('/projetos/:id', (req, res) => { 
    const id = req.params.id

    cliente.query('DELETE FROM projetos WHERE pr_id = $1', [id])
    return res.json("Deletado com sucesso!")
})

// Editando projetos
projetos.put('/projetos/:id', (req, res) => { 
    const id = req.params.id
    const body = req.body

    cliente.query('UPDATE projetos SET pr_nome = $1, pr_descricao = $2, pr_data_criacao = $3 WHERE pr_id = $4', [body.nome, body.descricao, body.data_criacao, id])
    return res.json("Alterado com sucesso!")
})

// Mostrar pessoas de um projeto
projetos.get('/projetos/:id/pessoas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT pe.pe_id, pe.pe_nome, eq.eq_nome, pr.pr_nome FROM projetos AS pr
                INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                INNER JOIN pessoas_pertencem_equipes AS epp ON epp.fk_equipe = eq.eq_id
                INNER JOIN pessoas AS pe ON pe.pe_id = epp.fk_pessoa
                WHERE pr.pr_id = $1
                ORDER BY pr.pr_id, eq.eq_id ,pe.pe_id`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar tarefas de um projeto
projetos.get('/projetos/:id/tarefas', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT tr.tr_id, tr.tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_data_finalizacao, pr_id, pr.pr_nome FROM projetos AS pr
                INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.pr_id
                INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                WHERE pr.pr_id = $1`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrar equipes de um projeto
projetos.get('/projetos/:id/equipes', (req, res) => { 
    const id = req.params.id

    cliente
        .query(`SELECT eq.eq_id, eq.eq_nome FROM projetos AS pr
                INNER JOIN projetos_posssuem_equipes AS ppe ON ppe.fk_projeto = pr.pr_id
                INNER JOIN equipes AS eq ON eq.eq_id = ppe.fk_equipe
                WHERE pr.pr_id = $1
                ORDER BY pr.pr_id, eq.eq_id`, [id])
        .then(results => {
            return res.json(results.rows)
        })
})

// Associar Tarefa com Projeto
projetos.post('/projetos/:id_projeto/tarefas/_id_tarefa', (req, res) => { 
    const id_projeto = req.params.id_projeto
    const id_tarefa = req.params.id_tarefa

    cliente
        .query(`INSERT INTO projetos_posssuem_tarefas (fk_projeto, fk_tarefa)
                VALUES ($1, $2)`, [id_projeto, id_tarefa])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mostrando projetos com um status específico
projetos.get('/projetos/status/:status', (req, res) => {
    const status = req.params.status

    cliente
        .query(`SELECT * FROM projetos
                WHERE pr_status = $1`, [status])
        .then(results => {
            return res.json(results.rows)
        })
})

// Mudar Status de um Projeto
projetos.put('/projetos/:id/status/:status', async (req, res) => {
    const id = req.params.id
    const status = req.params.status

    if (status === 'Concluido'){
        // Somente Autoriza a conclusão do projeto se todas as tarefas dele estiverem concluidas
        const tarefas = await cliente.query(`SELECT tr_id, tr_nome, tr_status FROM projetos AS pr
                                         INNER JOIN projetos_possuem_tarefas AS ppt ON ppt.fk_projeto = pr.pr_id
                                         INNER JOIN tarefas AS tr ON tr.tr_id = ppt.fk_tarefa
                                         WHERE pr_id = $1 AND tr.tr_status != 'Concluido'`, [id])

        console.log(tarefas.rowCount)
        
        if (tarefas.rowCount > 0) {
            return res.json({mensagem:'Não foi possível Concluir o Projeto, pois ainda existem tarefas não concluidas:', tarefas:tarefas.rows})
        }
    }

    // Mundando o status do projeto e garantindo que a sua data de finalização está nula
    cliente.query(`UPDATE projetos SET pr_status = $1, pr_data_finalizacao = $2 WHERE pr_id = $3`, [status, null ,id])
   
    // Se o projeto estiver sendo finalizado, temos que gravar a data de finalização:
    if (status === 'Concluido'){
        cliente.query(`UPDATE projetos SET pr_data_finalizacao = CURRENT_DATE WHERE pr_id = $1`, [id])
    }
    
    return res.json('Status Atualizado')
})

module.exports = projetos