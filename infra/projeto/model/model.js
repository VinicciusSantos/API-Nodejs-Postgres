const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const Projeto = database.define('projeto',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },

  descricao: Sequelize.STRING(400),

  status: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
})

module.exports = Projeto;