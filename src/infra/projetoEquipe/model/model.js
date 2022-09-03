const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const Projeto = require('../../projeto/model/model')
const Equipe = require('../../equipe/model/model')

const ProjetoEquipe = database.define('projetoEquipe',{})

Equipe.belongsToMany(Projeto, { through: 'projetoEquipe' });
Projeto.belongsToMany(Equipe, { through: 'projetoEquipe' });

module.exports = ProjetoEquipe;