const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const equipes = require('./equipe/routes')
const pessoas = require('./pessoa/routes')
app.use(equipes)
app.use(pessoas)

const host = '0.0.0.0';
const port = process.env.PORT || 8000;

app.listen(port, host, () => {
    console.log(`API funcionando no host:`, host, `e na porta:`, port)
})
