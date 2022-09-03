require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_URL)

async function Conectar() {
    try {
        await sequelize.sync({ force: false })
        console.log('Conexão Concluida')
    } catch (error) {
        console.error(error)
    }
}

Conectar()

module.exports = sequelize