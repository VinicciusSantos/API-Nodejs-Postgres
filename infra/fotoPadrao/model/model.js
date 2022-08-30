const { Sequelize } = require('sequelize');
const database = require('../../../config/database/dbpostgres')

const FotoPadrao = database.define('fotoPadrao',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  link: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
})

module.exports = FotoPadrao;