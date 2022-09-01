const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const Projeto = require('../../projeto/model/model')
const Equipe = require('../../equipe/model/model')

const ProjetoEquipe = database.define('projetoEquipe',{})

Equipe.belongsToMany(Projeto, { through: 'projetoEquipe' });
Projeto.belongsToMany(Equipe, { through: 'projetoEquipe' });

ProjetoEquipe.associate = (models) => {
    models.Equipe.belongsToMany(Projeto, {
      as: 'fk_projeto',
      through: ProjetoEquipe,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.Projeto.belongsToMany(Equipe, {
      as: 'fk_equipe',
      through: ProjetoEquipe,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

module.exports = ProjetoEquipe;