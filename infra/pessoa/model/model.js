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
    allowNull: false
  },

  nascimento: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  salario: Sequelize.DECIMAL,

  foto: Sequelize.STRING(300)
})

module.exports = Pessoa;