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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  data: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true
      // isAfter: new Date()
    }
  },
})

module.exports = Lembrete;