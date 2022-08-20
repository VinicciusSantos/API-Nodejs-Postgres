const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../src/routes')
const morgan = require('morgan')

const host = '0.0.0.0';
const port = process.env.PORT || 8000;

const app = express()

app.use(morgan('dev'))

app.use(express.static(__dirname + '/uploads'))
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, host, () => {
    console.log(`API funcionando no host:`, host, `e na porta:`, port)
})
