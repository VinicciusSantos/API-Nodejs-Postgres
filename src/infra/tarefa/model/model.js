const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')
const SubTarefa = require('../../subTarefa/model/model')

const Tarefa = database.define('tarefa',{
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

  descricao: Sequelize.STRING(400),

  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: "Não Iniciada",
    validate: {
      notEmpty: true,
      isIn: [["Em Desenvolvimento", "Não Iniciada", "Em Testes", "Concluido"]]
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

Tarefa.hasMany(SubTarefa)
SubTarefa.belongsTo(Tarefa);

module.exports = Tarefa;