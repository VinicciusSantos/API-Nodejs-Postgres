const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const Usuario = database.define('usuario',{
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
      notEmpty: true, 
    }
  },

  senha: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 4,
    }
  },

  email: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, 
      notNull: true,
      notEmpty: true, 
    }
  }
})

module.exports = Usuario;