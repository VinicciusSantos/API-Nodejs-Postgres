const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const Pessoa = database.define('pessoa',{
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
      min: 3, 
    }
  },

  nascimento: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isBefore: new Date().toISOString()
    }
  },

  cargo: {
    type: Sequelize.STRING(30)
  },

  salario: {
    type: Sequelize.DECIMAL,
    validate: {
      isFloat: true,
      notEmpty: true
    }
  },

  foto: {
    type: Sequelize.STRING(300),
    validate: {
      isUrl: true,
      notEmpty: false
    }
  }
})

module.exports = Pessoa;