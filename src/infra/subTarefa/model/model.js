const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const SubTarefa = database.define('subTarefa',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      min: 4,
      notEmpty: true
    }
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      isIn: [[0, 1]]
    }
  },

  prioridade: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      notEmpty: true,
      isIn: [[1, 2, 3]],
    }
  }
})

module.exports = SubTarefa;