const authenticateToken = require('../middlewares/jwt')
const express = require('express')
const router = express.Router()

router.use('/equipes', authenticateToken, require('./equipe/routes'))
router.use('/pessoas', authenticateToken, require('./pessoa/routes'))
router.use('/projetos', authenticateToken, require('./projeto/routes'))
router.use('/tarefas', authenticateToken, require('./tarefa/routes'))
router.use('/subTarefas', authenticateToken, require('./subTarefa/routes'))
router.use('/lembretes', authenticateToken, require('./lembrete/routes'))
router.use('/relatorios', authenticateToken, require('./relatorio/routes'))
router.use('/auth', require('./auth/routes'))

module.exports = router
