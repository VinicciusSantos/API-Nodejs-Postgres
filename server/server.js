const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const app = express()

app.use(routes)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`API funcionando no host: ${host} e na porta: ${port}`)
})
