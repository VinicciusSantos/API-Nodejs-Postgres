const express = require('express');
const router = express.Router();
var handlerLembrete = require('./handler')

router.post("/", handlerLembrete.NovoLembrete)
router.get("/", handlerLembrete.BuscarLembretes)
router.delete("/:id", handlerLembrete.Delete)

module.exports = router