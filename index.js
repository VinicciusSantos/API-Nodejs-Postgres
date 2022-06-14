const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, host, () => {
    console.log(`API funcionando no host:`, host, `e na porta:`, port)
})

const Client = require('pg').Client
const cliente = new Client({
    user: "postgres",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "SysProjetos"
})

