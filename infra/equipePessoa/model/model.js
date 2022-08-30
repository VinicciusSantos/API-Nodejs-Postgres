const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const Equipe = require('../../equipe/model/model')
const Pessoa = require('../../pessoa/model/model')

const EquipePessoa = database.define('equipePessoa',{})

Pessoa.belongsToMany(Equipe, { through: 'equipePessoa' });
Equipe.belongsToMany(Pessoa, { through: 'equipePessoa' });

module.exports = EquipePessoa;