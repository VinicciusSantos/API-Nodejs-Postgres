const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const FotoPadrao = require('../../fotoPadrao/model/model')

const Equipe = database.define('equipe',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      min: 4
    }
  }
})

Equipe.belongsTo(FotoPadrao)
FotoPadrao.hasOne(Equipe)

module.exports = Equipe;