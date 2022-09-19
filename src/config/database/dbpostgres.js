require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

const Conectar = async () => {
    try {
        await sequelize.sync({ force: false })
    } catch (error) {
        console.error(error)
    }
}

Conectar()

module.exports = sequelize