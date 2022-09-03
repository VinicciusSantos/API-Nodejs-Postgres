const express = require('express');
const router = express.Router();
var handlerTarefa = require('./handler')

router.get("/:id", handlerTarefa.BuscarPorId)
router.get("/", handlerTarefa.BuscarTarefas)
router.post("/", handlerTarefa.NovaTarefa)
router.put("/:id", handlerTarefa.Edit)
router.delete("/:id", handlerTarefa.Delete)

module.exports = router