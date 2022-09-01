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
    unique: true,
    validate: {
      min: 4,
      notEmpty: true
    }
  },

  descricao: Sequelize.STRING(400),

  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'Não Iniciado',
    validate: {
      isAlpha: true,
      notEmpty: true,
      isIn: [["Ativo", "Concluido", "Em Andamento"]]
    }
  }
})

module.exports = Projeto;