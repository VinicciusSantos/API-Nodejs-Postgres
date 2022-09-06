const express = require('express');
const router = express.Router();
var handlerRelatorio = require('./handler')

router.get("/projetos", handlerRelatorio.relProjetos)
router.get("/equipes/:id", handlerRelatorio.relEquipe)
router.get("/pessoas/:id", handlerRelatorio.relPessoa)

module.exports = router