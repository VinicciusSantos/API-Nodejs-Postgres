const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const authenticateToken = require('../middlewares/jwt')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const equipes = require('./equipe/routes')
const pessoas = require('./pessoa/routes')
const projetos = require('./projeto/routes')
const tarefas = require('./tarefa/routes')
const subTarefas = require('./subTarefa/routes')
const lembretes = require('./lembrete/routes')
const relatorios = require('./relatorio/routes')
const auth = require('./auth/routes')
app.use('/equipes', authenticateToken, equipes)
app.use('/pessoas', authenticateToken, pessoas)
app.use('/projetos', authenticateToken, projetos)
app.use('/tarefas', authenticateToken, tarefas)
app.use('/subtarefas', authenticateToken, subTarefas)
app.use('/lembretes', authenticateToken, lembretes)
app.use('/relatorios', authenticateToken, relatorios)
app.use('/auth', auth)

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

app.listen(port, host, () => {
    console.log(`API funcionando no host:`, host, `e na porta:`, port)
})
