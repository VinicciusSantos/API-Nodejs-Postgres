const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const Tarefa = database.define('tarefa',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },

  descricao: Sequelize.STRING(400),

  status: {
    type: Sequelize.STRING(20),
    allowNull: false
  },

  prioridade: Sequelize.INTEGER
})

module.exports = Tarefa;