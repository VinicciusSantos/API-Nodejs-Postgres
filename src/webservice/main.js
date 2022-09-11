const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gerenciamento de Projetos",
            version: '2.0.0',
        },
        servers: [{url: "localhost:8000"}, {url: "https://api-brisa-nodejs-postgresql.herokuapp.com"}],
    },
    apis: ["./src/webservice/*/routes.js"]
};
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

app.listen(port, host, () => {
    console.log(`API funcionando no host: ${host} e na porta: ${port}`)
})
