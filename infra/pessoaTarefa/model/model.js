const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const Pessoa = require('../../pessoa/model/model')
const Tarefa = require('../../tarefa/model/model')

const PessoaTarefa = database.define('pessoaTarefa',{})

Tarefa.belongsToMany(Pessoa, { through: 'pessoaTarefa' });
Pessoa.belongsToMany(Tarefa, { through: 'pessoaTarefa' });

module.exports = PessoaTarefa;