const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const Lembrete = database.define('lembrete',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  descricao: {
    type: Sequelize.STRING(400),
    allowNull: false
  },

  data: {
    type: Sequelize.DATE,
    allowNull: false
  },
})

module.exports = Lembrete;