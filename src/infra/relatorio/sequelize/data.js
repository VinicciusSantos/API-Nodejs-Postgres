const sequelize = require('../../../config/database/dbpostgres')

exports.relProjetos = async () => {
    return sequelize.query(`SELECT
                            EXTRACT(MONTH from "updatedAt") AS mes,
                            EXTRACT(YEAR from "updatedAt") AS ano,
                            COUNT(*) as concluidos FROM projetos
                            WHERE "updatedAt" IS NOT NULL AND status = 'Concluido'
                            GROUP BY EXTRACT(MONTH from "updatedAt"), EXTRACT(YEAR FROM "updatedAt")
                            ORDER BY EXTRACT(MONTH from "updatedAt"), EXTRACT(YEAR FROM "updatedAt")`)
}

exports.relEquipe = async (id) => {
    return sequelize.query(`SELECT pe.nome, COUNT(tr.id) FROM pessoas AS pe
                            INNER JOIN "equipePessoas" AS ppe ON ppe."pessoaId" = pe.id
                            INNER JOIN equipes AS eq ON eq.id = ppe."equipeId"
                            INNER JOIN "pessoaTarefas" AS pat ON pat."pessoaId" = pe.id
                            INNER JOIN tarefas AS tr ON tr.id = pat."tarefaId"
                            WHERE tr.status = 'Concluido' AND eq.id = ${id}
                            GROUP BY pe.nome
                            ORDER BY COUNT(tr.id) DESC`)
}

exports.relPessoa = async (id) => {
    return sequelize.query(`SELECT
                            EXTRACT(MONTH FROM tr."updatedAt") AS mes,
                            EXTRACT(YEAR FROM tr."updatedAt") AS ano,
                            COUNT(*) FROM tarefas AS tr
                            INNER JOIN "pessoaTarefas" AS pat ON pat."tarefaId" = tr.id
                            INNER JOIN pessoas AS pe ON pe.id = pat."pessoaId"
                            WHERE pe.id = ${id} AND tr.status = 'Concluido'
                            GROUP BY EXTRACT(MONTH FROM tr."updatedAt"), EXTRACT(YEAR FROM tr."updatedAt")`)
}

exports.verificaTarefasFinalizadas = async (id) => {
    return sequelize.query(`SELECT COUNT(*) FROM tarefas AS tr
                            INNER JOIN "pessoaTarefas" AS pat ON pat."tarefaId" = tr.id
                            INNER JOIN pessoas AS pe ON pe.id = pat."pessoaId"
                            WHERE pe.id = ${id} AND tr.status = 'Concluido'`)
}

exports.RetornaDataAtual = async () => {
    return sequelize.query(`SELECT
                            EXTRACT(MONTH FROM CURRENT_DATE) AS mes,
                            EXTRACT(YEAR FROM CURRENT_DATE) AS ano,
                            '0' AS quantidade`)
}