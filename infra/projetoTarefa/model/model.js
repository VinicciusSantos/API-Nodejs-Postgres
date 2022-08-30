const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const Projeto = require('../../projeto/model/model')
const Tarefa = require('../../tarefa/model/model')

const ProjetoTarefa = database.define('projetoTarefa',{})

Tarefa.belongsToMany(Projeto, { through: 'projetoTarefa' });
Projeto.belongsToMany(Tarefa, { through: 'projetoTarefa' });

module.exports = ProjetoTarefa;