const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('../config/swagger/swagger')
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())     
app.use(require('./routes'))
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const host = '0.0.0.0';
const port = process.env.PORT || 8000;

const server = app.listen(port, host)

module.exports = server
