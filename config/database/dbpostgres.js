require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_URL)

const Equipe = require('../../infra/equipe/model/model')
const EquipePessoa = require('../../infra/equipePessoa/model/model')
const FotoPadrao = require('../../infra/fotoPadrao/model/model')
const Lembrete = require('../../infra/lembrete/model/model')
const Pessoa = require('../../infra/pessoa/model/model')
const PessoaTarefa = require('../../infra/pessoaTarefa/model/model')
const Projeto = require('../../infra/projeto/model/model')
const ProjetoEquipe = require('../../infra/projetoEquipe/model/model')
const ProjetoTarefa = require('../../infra/projetoTarefa/model/model')
const Tarefa = require('../../infra/tarefa/model/model') 

async function Conectar() {
    try {
        await db.sync()
        console.log('Conexão Concluida')
    } catch (error) {
        console.error(error)
    }
}

Conectar()

module.exports = sequelize